<?php

namespace Inc\Setup;

final class Setup
{
	function __construct()
	{
		add_action('after_setup_theme', [$this, 'menus']);
		add_action('after_setup_theme', [$this, 'themeSupport']);
		add_action('init', [$this, 'activate_permalink']);
		add_filter('rest_url', [$this, 'change_outgoing_url']);
	}

	/**
	 * Changes outgoing internal REST API requests url.
	 */
	public function change_outgoing_url($url)
	{
		$url = str_replace(home_url(), site_url(), $url);

		return $url;
	}

	/**
	 * If it is not set permalink it sets a permalink structure to avoid plain settings.
	 */
	public function activate_permalink(): void
	{
		$permalink_structure = get_option('permalink_structure');

		if (!$permalink_structure) {
			global $wp_rewrite;

			$wp_rewrite->set_permalink_structure('post/%postname%/');
			update_option("rewrite_rules", false);
			$wp_rewrite->flush_rules(true);
		}
	}

	/**
	 * Register menu locations
	 */
	public function menus(): void
	{
		register_nav_menus([
			'desktop_top_menu' => 'Desktop Top Menu',
			'mobile_bottom_menu' => 'Mobile Bottom Menu'
		]);
	}

	/**
	 * Adds theme supports
	 */
	public function themeSupport()
	{
		add_theme_support('post-thumbnails', ['post']);
	}
}
