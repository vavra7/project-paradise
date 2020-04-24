<?php

namespace Inc\Post_Types\Includes;

class Post_Meta
{
	/**
	 * Define and register all meta needed by gutenberg panel "Post Meta"
	 */
	public function register_meta_for_meta_panel($post_types): void
	{
		if (!is_array($post_types)) $post_types = [$post_types];

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

		foreach ($post_types as $post_type) {
			foreach ($meta_fields as $meta_field) {
				register_post_meta($post_type, $meta_field['name'], $meta_field['args']);
			}
		}
	}

	/**
	 * Define and register all meta needed by gutenberg panel "Sidebar"
	 */
	public function register_meta_for_sidebar_customization($post_types): void
	{
		if (!is_array($post_types)) $post_types = [$post_types];

		$meta_fields = [
			[
				'name' => '_sidebar_override',
				'args' => [
					'show_in_rest' => true,
					'single' => true,
					'type' => 'string',
					'auth_callback' => function () {
						return current_user_can('edit_posts');
					}
				]
			],
			[
				'name' => '_bio_widget_override',
				'args' => [
					'show_in_rest' => true,
					'single' => true,
					'type' => 'string',
					'auth_callback' => function () {
						return current_user_can('edit_posts');
					}
				]
			]
		];

		foreach ($post_types as $post_type) {
			foreach ($meta_fields as $meta_field) {
				register_post_meta($post_type, $meta_field['name'], $meta_field['args']);
			}
		}
	}

	/**
	 * Define and register all meta needed by translation link
	 */
	public function register_meta_for_translation_link($post_types): void
	{
		if (!is_array($post_types)) $post_types = [$post_types];

		$meta_fields = [
			[
				'name' => '_translation_link_en',
				'args' => [
					'show_in_rest' => true,
					'single' => true,
					'type' => 'number',
					'auth_callback' => function () {
						return current_user_can('edit_posts');
					}
				]
			],
			[
				'name' => '_translation_link_cs',
				'args' => [
					'show_in_rest' => true,
					'single' => true,
					'type' => 'number',
					'auth_callback' => function () {
						return current_user_can('edit_posts');
					}
				]
			]
		];

		foreach ($post_types as $post_type) {
			foreach ($meta_fields as $meta_field) {
				register_post_meta($post_type, $meta_field['name'], $meta_field['args']);
			}
		}
	}
}
