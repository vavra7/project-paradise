<?php

namespace Inc\Posts;

use Inc\Commons\Post_Meta;

class Posts
{
	private $post_meta;

	function __construct()
	{
		$this->post_meta = new Post_Meta;

		add_action('after_setup_theme', [$this, 'add_theme_support']);
		add_action('init', [$this, 'register_meta_for_meta_panel']);
		add_filter('tag_link', [$this, 'new_tag_link']);
	}

	/**
	 * Adds theme supports for posts
	 */
	public function add_theme_support()
	{
		add_theme_support('post-thumbnails', ['post']);
	}

	/**
	 * Inserts '/app' in path of tag link
	 */
	public function new_tag_link($tag_link): string
	{
		$home_url = get_home_url();
		$path = rtrim(parse_url($tag_link, PHP_URL_PATH), '/');
		$new_tag_ling = sprintf('%s/app%s', $home_url, $path);

		return $new_tag_ling;
	}

	/**
	 * Register all meta for post needed by gutenberg panel "Post Meta"
	 */
	public function register_meta_for_meta_panel(): void
	{
		$this->post_meta->register_meta_for_meta_panel('post');
	}
}
