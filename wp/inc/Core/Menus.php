<?php

namespace Inc\Core;

use Inc\Callbacks\Gui\Menu_Templates;

require_once dirname(__FILE__) . '/Custom_Admin_Walker_Menu.php';

final class Menus
{
	private const menu_item_inputs = [
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
		$this->menu_templates = new Menu_Templates;

		add_filter('wp_setup_nav_menu_item', [$this, 'add_custom_field_in_menu_item_object']);
		add_filter('wp_edit_nav_menu_walker', [$this, 'custom_admin_walker_menu'], 10);
		add_action('wp_update_nav_menu_item', [$this, 'on_save_menu_items'], 10, 3);
		add_filter('manage_nav-menus_columns', [$this, 'setup_menu_columns'], 99);
	}

	/**
	 * Adds custom field into object of menu item
	 */
	public function add_custom_field_in_menu_item_object($menu_item)
	{
		foreach (self::menu_item_inputs as $input_field) {
			$id = $input_field['id'];
			$menu_item->$id = get_post_meta($menu_item->ID, $input_field['meta_key'], true);
		}

		return $menu_item;
	}

	/**
	 * Defines available options to display columns in admin menu section
	 */
	public function setup_menu_columns($columns)
	{
		$custom_columns = [];

		foreach (self::menu_item_inputs as $input_field) {
			$custom_columns[$input_field['id']] = $input_field['label'];
		}

		$columns = array_merge($columns, $custom_columns);

		return $columns;
	}

	/**
	 * Sets class with output which replaces default admin menu UI
	 */
	public function custom_admin_walker_menu()
	{
		return 'Custom_Admin_Walker_Menu';
	}

	/**
	 * Renders input for custom fields
	 */
	public function menu_item_input($item)
	{
		foreach (self::menu_item_inputs as $input_field) {
			$id = $input_field['id'];

			$this->menu_templates->menu_item_input_description_wide(
				$id,
				$item->ID,
				$input_field['label'],
				$item->$id,
				$input_field['args']
			);
		}
	}

	/**
	 * On saving menus 
	 */
	public function on_save_menu_items($menu_id, $post_id, $args)
	{
		if (defined('DOING_AJAX') && DOING_AJAX) return;

		check_admin_referer('update-nav_menu', 'update-nav-menu-nonce');


		foreach (self::menu_item_inputs as $input_field) {
			$name = sprintf('menu-item-%s', $input_field['id']);
			$value = $_POST[$name][$post_id];

			$value = trim(sanitize_text_field($value));

			if ($value) {
				update_post_meta($post_id, $input_field['meta_key'], $value);
			} else {
				delete_post_meta($post_id, $input_field['meta_key']);
			}
		}
	}
}
