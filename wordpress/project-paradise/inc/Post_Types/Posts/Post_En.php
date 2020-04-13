<?php

namespace Inc\Post_Types\Posts;

use Inc\Post_Types\Post_Types;

class Post_En extends Post_Types
{
	function __construct()
	{
		add_action('init', [$this, 'register_post_en']);
	}

	/**
	 * Register custom post type for en pages.
	 */
	public function register_post_en()
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
			'rest_base' => 'posts_en',
			'menu_position' => 5,
			'menu_icon' => 'dashicons-admin-post',
			'supports' => [
				'title',
				'editor',
				'thumbnail',
				'custom-fields',
				'excerpt',
				'comments'
			],
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

		register_post_type(self::POST_TYPES['POST_EN'], $args);
	}
}
