<?php

namespace Inc\Pages;

use Inc\Commons\Post_Meta;
use Inc\Templates\Pages_Templates;

class Pages
{
	public function __construct()
	{
		$this->post_meta = new Post_Meta;

		add_action('init', [$this, 'register_post_meta']);
		add_action('add_meta_boxes_page', [$this, 'add_meta_boxes_on_page_for_posts']);
		add_action('save_post', [$this, 'save_meta_on_page_for_posts']);
	}

	/**
	 * Register all post meta
	 */
	public function register_post_meta(): void
	{
		$this->post_meta->register_meta_for_meta_panel('page');
		$this->post_meta->register_meta_for_sidebar_customization('page');
	}

	/**
	 * Adding meta boxes of meta panel on page for posts.
	 * Needed since page for posts doesn't support gutenberg
	 */
	public function add_meta_boxes_on_page_for_posts($post)
	{
		if (!empty($post) && get_option('page_for_posts') && $post->ID === get_option('page_for_posts')) {
			$meta_description = [
				'id' => '_custom_title',
				'title' => 'Title',
				'callback' => [Pages_Templates::class, 'custom_title_input'],
				'screen' => 'page',
				'context' => 'side',
				'priority' => 'default',
				'args' => []
			];

			add_meta_box(
				$meta_description['id'],
				$meta_description['title'],
				$meta_description['callback'],
				$meta_description['screen'],
				$meta_description['context'],
				$meta_description['priority'],
				$meta_description['args']
			);
		}
	}

	/**
	 * Saving meta of meta boxes of meta panel on page for posts.
	 * Needed since page for posts doesn't support gutenberg
	 */
	public function save_meta_on_page_for_posts($post_id)
	{
		if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
		if (!get_option('page_for_posts') || $post_id != get_option('page_for_posts')) return;
		if (!current_user_can('edit_post', $post_id)) return;

		if ($_POST['_custom_title']) {
			update_post_meta($post_id, '_custom_title', $_POST['_custom_title']);
		} else {
			delete_post_meta($post_id, '_custom_title');
		}
	}
}
