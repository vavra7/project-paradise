<?php

namespace Inc\Post_Types\Posts;

use Inc\Post_Types\Includes\Post_Meta;
use Inc\Templates\Pages_Templates;
use Inc\Post_Types\Post_Types;

class Page extends Post_Types
{
	function __construct()
	{
		$this->post_meta = new Post_Meta;

		add_action('add_meta_boxes_page', [$this, 'add_meta_boxes_on_page_for_posts']);
		add_action('save_post', [$this, 'save_meta_on_page_for_posts']);
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
				'screen' => self::POST_TYPES['PAGE'],
				'context' => 'side',
				'priority' => 'default',
				'args' => []
			];

			add_meta_box(...array_values($meta_description));
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
