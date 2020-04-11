<?php

namespace Inc\Post_Types;

class Pages_En
{
	const PAGES_EN = 'pages_en';

	function __construct()
	{
		add_action('init', [$this, 'register_pages_en']);
	}

	/**
	 * Register custom post type for en pages.
	 */
	public function register_pages_en()
	{
		$labels = [
			'name' => __('Pages (en)', 'project-paradise'),
			'singular_name' => __('Page (en)', 'project-paradise'),
			'all_items' => __('All Pages (en)', 'project-paradise'),
		];

		$args = [
			'labels' => $labels,
			'public' => true,
			'hierarchical' => false,
			'show_in_rest' => true,
			'rest_base' => self::PAGES_EN,
			'menu_position' => 20,
			'menu_icon' => 'dashicons-admin-page',
			'has_archive' => true,
			'rewrite' => [
				'slug' => 'en',
				'with_front' => false
			]
		];

		register_post_type(self::PAGES_EN, $args);
	}
}
