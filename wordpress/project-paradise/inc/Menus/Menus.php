<?php

namespace Inc\Menus;

use Inc\Templates\Menus_Inputs;

class Menus
{
	public $icon_field;

	function __construct()
	{
		$this->init();

		add_action('after_setup_theme', [$this, 'register_menu_locations']);
		add_action('wp_update_nav_menu_item', [$this, 'on_save_menu_items'], 10, 3);
		add_filter('wp_setup_nav_menu_item', [$this, 'add_items_in_menu_object']);
		add_filter('manage_nav-menus_columns', [$this, 'setup_menu_columns'], 99);
		add_action('wp_nav_menu_item_custom_fields', [$this, 'handle_icon_input'], 10, 2);
	}

	/**
	 * Initialize class' variables
	 */
	public function init()
	{
		$this->icon_field = [
			'id' => 'icon',
			'label' => __('Icon', 'project-paradise'),
			'meta_key' => '_menu_item_icon',
		];
	}

	/**
	 * Register menu locations
	 */
	public function register_menu_locations(): void
	{
		register_nav_menus([
			'desktop_top_menu' => __('Desktop Top Menu', 'project-paradise'),
			'desktop_top_menu_en' => __('Desktop Top Menu (en)', 'project-paradise'),
			'mobile_bottom_menu' => __('Mobile Bottom Menu', 'project-paradise'),
			'mobile_bottom_menu_en' => __('Mobile Bottom Menu (en)', 'project-paradise')
		]);
	}

	/**
	 * On saving menus 
	 */
	public function on_save_menu_items($menu_id, $post_id, $args)
	{
		if (defined('DOING_AJAX') && DOING_AJAX) return;
		check_admin_referer('update-nav_menu', 'update-nav-menu-nonce');

		$name = sprintf('menu-item-%s', $this->icon_field['id']);
		$value = $_POST[$name][$post_id];
		$value = trim(sanitize_text_field($value));

		update_post_meta($post_id, $this->icon_field['meta_key'], $value);
	}

	/**
	 * Adds custom fields into object of menu items
	 * and assigns its value
	 */
	public function add_items_in_menu_object($menu_item)
	{
		$field_id = $this->icon_field['id'];
		$menu_item->$field_id = get_post_meta($menu_item->ID, $this->icon_field['meta_key'], true);

		return $menu_item;
	}

	/**
	 * Defines new items into options to display columns in admin menu section
	 */
	public function setup_menu_columns($columns)
	{
		$new_columns = [];
		$new_columns[$this->icon_field['id']] = $this->icon_field['label'];

		return array_merge($columns, $new_columns);
	}

	/**
	 * Handles rendering of input
	 */
	public function handle_icon_input($item_id, $item)
	{
		$field_id = $this->icon_field['id'];

		$args = [
			'field_id' => $field_id,
			'item_id' => $item_id,
			'label' => $this->icon_field['label'],
			'value' => $item->$field_id
		];

		Menus_Inputs::render_icon_input($args);
	}
}
