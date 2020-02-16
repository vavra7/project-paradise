<?php

namespace Inc\Commons;

class Post_Meta
{
	/**
	 * Define and register all meta needed by gutenberg panel "Post Meta"
	 */
	public function register_meta_for_meta_panel(string $post_type): void
	{
		$meta_fields = [
			[
				'name' => '_title',
				'args' => [
					'show_in_rest' => true,
					'single' => true,
					'type' => 'string',
					'sanitize_callback' => 'sanitize_text_field',
					'auth_callback' => function () {
						return current_user_can('edit_posts');
					}
				]
			],
			[
				'name' => '_description',
				'args' => [
					'show_in_rest' => true,
					'single' => true,
					'type' => 'string',
					'sanitize_callback' => 'sanitize_textarea_field',
					'auth_callback' => function () {
						return current_user_can('edit_posts');
					}
				]
			],
			[
				'name' => '_og_title',
				'args' => [
					'show_in_rest' => true,
					'single' => true,
					'type' => 'string',
					'sanitize_callback' => 'sanitize_text_field',
					'auth_callback' => function () {
						return current_user_can('edit_posts');
					}
				]
			],

			[
				'name' => '_og_description',
				'args' => [
					'show_in_rest' => true,
					'single' => true,
					'type' => 'string',
					'sanitize_callback' => 'sanitize_textarea_field',
					'auth_callback' => function () {
						return current_user_can('edit_posts');
					}
				]
			],
			[
				'name' => '_og_image',
				'args' => [
					'show_in_rest' => true,
					'single' => true,
					'type' => 'integer',
					'auth_callback' => function () {
						return current_user_can('edit_posts');
					}
				]
			]
		];

		foreach ($meta_fields as $meta_field) {
			register_post_meta($post_type, $meta_field['name'], $meta_field['args']);
		}
	}
}
