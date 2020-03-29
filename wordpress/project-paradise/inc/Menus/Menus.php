<?php

namespace Inc\Menus;

use Inc\Templates\Menu_Templates;

class Menus
{
	private const new_items = [
		[
			'id' => 'icon',
			'label' => 'Icon',
			'meta_key' => '_menu_item_icon',
			'args' => [
				'code' => true
			]
		]
	];

	function __construct()
	{
		add_action('after_setup_theme', [$this, 'register_menu_locations']);
		add_action('wp_update_nav_menu_item', [$this, 'on_save_menu_items'], 10, 3);

		add_filter('wp_setup_nav_menu_item', [$this, 'add_items_in_menu_object']);
		add_filter('manage_nav-menus_columns', [$this, 'setup_menu_columns'], 99);
		add_filter('wp_edit_nav_menu_walker', [$this, 'custom_admin_walker_menu'], 10);
	}

	/**
	 * Register menu locations
	 */
	public function register_menu_locations(): void
	{
		register_nav_menus([
			'desktop_top_menu' => 'Desktop Top Menu',
			'mobile_bottom_menu' => 'Mobile Bottom Menu'
		]);
	}

	/**
	 * On saving menus 
	 */
	public function on_save_menu_items($menu_id, $post_id, $args)
	{
		if (defined('DOING_AJAX') && DOING_AJAX) return;

		check_admin_referer('update-nav_menu', 'update-nav-menu-nonce');

		foreach (self::new_items as $new_item) {
			$name = sprintf('menu-item-%s', $new_item['id']);
			$value = $_POST[$name][$post_id];
			$value = trim(sanitize_text_field($value));

			if ($value) {
				update_post_meta($post_id, $new_item['meta_key'], $value);
			} else {
				delete_post_meta($post_id, $new_item['meta_key']);
			}
		}
	}

	/**
	 * Adds custom fields into object of menu items
	 * and assign its value
	 */
	public function add_items_in_menu_object($menu_item)
	{
		foreach (self::new_items as $new_item) {
			$new_item_id = $new_item['id'];
			$menu_item->$new_item_id = get_post_meta($menu_item->ID, $new_item['meta_key'], true);
		}

		return $menu_item;
	}

	/**
	 * Defines new items into options to display columns in admin menu section
	 */
	public function setup_menu_columns($columns)
	{
		$new_columns = [];

		foreach (self::new_items as $new_item) {
			$new_columns[$new_item['id']] = $new_item['label'];
		}

		return array_merge($columns, $new_columns);
	}

	/**
	 * Sets class with output which replaces default admin menu UI
	 */
	public function custom_admin_walker_menu()
	{
		require_once dirname(__FILE__) . '/Includes/Custom_Admin_Walker_Menu.php';

		return 'Custom_Admin_Walker_Menu';
	}

	/**
	 * Renders input fields for walker menu class
	 */
	public function get_menu_item_input($item)
	{
		foreach (self::new_items as $new_item) {
			$id = $new_item['id'];

			Menu_Templates::menu_item_input_description_wide(
				$id,
				$item->ID,
				$new_item['label'],
				$item->$id,
				$new_item['args']
			);
		}
	}
}
