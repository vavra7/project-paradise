<?php

namespace Inc\Post_Types\Posts;

use Inc\Post_Types\Post_Types;

class Page_En extends Post_Types
{
	function __construct()
	{
		add_action('init', [$this, 'register_page_en']);
	}

	/**
	 * Register custom post type for en pages.
	 */
	public function register_page_en()
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
			'rest_base' => 'pages_en',
			'menu_position' => 20,
			'menu_icon' => 'dashicons-admin-page',
			'supports' => [
				'title',
				'editor',
				'thumbnail',
				'excerpt',
				'custom-fields',
				'comments'
			],
			'has_archive' => true,
			'rewrite' => [
				'slug' => 'en',
				'with_front' => false
			]
		];

		register_post_type(self::POST_TYPES['PAGE_EN'], $args);
	}
}
