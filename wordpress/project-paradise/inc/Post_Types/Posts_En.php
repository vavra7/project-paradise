<?php

namespace Inc\Post_Types;

class Posts_En
{
	const POSTS_EN = 'posts_en';

	function __construct()
	{
		add_action('init', [$this, 'register_posts_en']);
	}

	/**
	 * Register custom post type for en pages.
	 */
	public function register_posts_en()
	{
		$labels = [
			'name' => __('Posts (en)', 'project-paradise'),
			'singular_name' => __('Post (en)', 'project-paradise'),
			'all_items' => __('All Posts (en)', 'project-paradise'),
		];

		$args = [
			'labels' => $labels,
			'public' => true,
			'hierarchical' => false,
			'show_in_rest' => true,
			'rest_base' => self::POSTS_EN,
			'menu_position' => 5,
			'menu_icon' => 'dashicons-admin-post',
			'has_archive' => true,
			'taxonomies' => [
				'category',
				'post_tag'
			],
			'rewrite' => [
				'slug' => 'en',
				'with_front' => true
			]
		];

		register_post_type(self::POSTS_EN, $args);
	}
}
