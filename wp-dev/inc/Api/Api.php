<?php

namespace Inc\Api;

final class Api
{
	public function register(): void
	{
		add_action('rest_api_init', [$this, 'menu_api']);
	}

	/**
	 * Adds new endpoint in open api
	 * wp/v1/menus
	 */
	public function menu_api(): void
	{
		register_rest_route('wp/v1', 'menus', [
			'methods' => \WP_REST_Server::READABLE,
			'callback' => [$this, 'get_location_menus']
		]);
	}

	/**
	 * Generate data for endpoint menus
	 */
	public function get_location_menus(): array
	{
		$location_menus = [];

		$location_slugs = get_nav_menu_locations();
		$location_names = get_registered_nav_menus();

		foreach ($location_slugs as $location_slug => $menu_id) {

			if (!$menu_id) {
				$location_menus[] = [
					'id'						=> $location_slug,
					'location_slug'	=> $location_slug,
					'location_name'	=> $location_names[$location_slug],
					'menu_id'				=> null,
					'menu_slug'			=> null,
					'menu_name'			=> null,
					'items_count'		=> 0,
					'items'					=> []
				];
			} else {
				$menu = wp_get_nav_menu_object($menu_id);
				$menu_items = $this->get_menu_items($menu_id);
				$location_menus[] = [
					'id'						=> $location_slug,
					'location_slug'	=> $location_slug,
					'location_name'	=> $location_names[$location_slug],
					'menu_id'				=> $menu_id,
					'menu_slug'			=> $menu->slug,
					'menu_name'			=> $menu->name,
					'items_count'		=> $menu->count,
					'items'					=> $menu_items
				];
			}
		}

		return $location_menus;
	}

	/**
	 * Returns menu items
	 */
	public function get_menu_items(int $menu_id): array
	{
		$menu_items = [];

		foreach (wp_get_nav_menu_items($menu_id) as $item) {
			$menu_items[] = [
				'id' => $item->ID,
				'title' => $item->title,
				'url' => $item->url,
				'path' => rtrim(parse_url($item->url, PHP_URL_PATH), '/') ?: '/',
				'type' => $item->object,
				'menu_item_parent' => $item->menu_item_parent,
				'menu_order' => $item->menu_order,
				'internal' => $this->is_internal($item->url)
			];
		};

		return $menu_items;
	}

	/**
	 * Based on user's home url and site url determines whether link is internal or external
	 */
	public function is_internal(string $url): bool
	{
		$parsed_home_url = parse_url(get_home_url());
		$parsed_site_url = parse_url(get_site_url());
		$parsed_input_url = parse_url($url);

		$home_code = (array_key_exists('host', $parsed_home_url) ? $parsed_home_url['host'] : '') . (array_key_exists('port', $parsed_home_url) ? $parsed_home_url['port'] : '');
		$site_code = (array_key_exists('host', $parsed_site_url) ? $parsed_site_url['host'] : '') . (array_key_exists('port', $parsed_site_url) ? $parsed_site_url['port'] : '');
		$input_code = (array_key_exists('host', $parsed_input_url) ? $parsed_input_url['host'] : '') . (array_key_exists('port', $parsed_input_url) ? $parsed_input_url['port'] : '');

		if (($home_code === $input_code) || ($site_code === $input_code)) return true;

		return false;
	}
}
