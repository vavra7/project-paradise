<?php

namespace Inc\Commons;

class Post_Meta
{
	/**
	 * Define and register all meta needed by gutenberg panel "Post Meta"
	 */
	public function register_meta_for_meta_panel(string $post_type): void
	{
		$args = [
			'show_in_rest' => true,
			'single' => true,
			'type' => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'auth_callback' => function () {
				return current_user_can('edit_posts');
			}
		];

		register_post_meta($post_type, '_custom_title', $args);
	}
}
