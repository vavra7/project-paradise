<?php

namespace Inc\Post_Types;

use Inc\Post_Types\Includes\Post_Meta;

class Post_Types
{
	const POST_TYPES = [
		'POST' => 'post',
		'POST_EN' => 'post_en',
		'PAGE' => 'page',
		'PAGE_EN' => 'page_en',
	];

	private $post_meta;

	function __construct()
	{
		$this->post_meta = new Post_Meta;

		add_action('after_setup_theme', [$this, 'add_post_thumbnails']);
		add_action('init', [$this, 'register_common_post_meta']);
	}

	/**
	 * Enables thumbnails for posts
	 */
	public function add_post_thumbnails(): void
	{
		add_theme_support('post-thumbnails', [
			self::POST_TYPES['POST'],
			self::POST_TYPES['POST_EN'],
			self::POST_TYPES['PAGE'],
			self::POST_TYPES['PAGE_EN']
		]);
	}

	/**
	 * Register post meta commons for more post types
	 */
	public function register_common_post_meta()
	{
		$this->post_meta->register_meta_for_meta_panel([
			self::POST_TYPES['POST'],
			self::POST_TYPES['POST_EN'],
			self::POST_TYPES['PAGE'],
			self::POST_TYPES['PAGE_EN']
		]);

		$this->post_meta->register_meta_for_sidebar_customization([
			self::POST_TYPES['POST'],
			self::POST_TYPES['POST_EN']
		]);

		$this->post_meta->register_meta_for_translation_link([
			self::POST_TYPES['POST'],
			self::POST_TYPES['POST_EN'],
			self::POST_TYPES['PAGE'],
			self::POST_TYPES['PAGE_EN']
		]);
	}
}
