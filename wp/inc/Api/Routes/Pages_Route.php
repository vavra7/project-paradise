<?php

namespace Inc\Api\Routes;

class Pages_Route
{
	static $page_states = [
		'page_on_front',
		'wp_page_for_privacy_policy',
		'page_for_posts'
	];

	private $pages_with_state = [];

	function __construct()
	{
		$this->fetch_pages_with_state();
		add_action('rest_api_init', [$this, 'add_page_states']);
	}

	/**
	 * Fetches from database ids of posts with existing states
	 * and saves list in variable
	 */
	public function fetch_pages_with_state(): void
	{
		foreach (self::$page_states as $state) {
			$post_id = get_option($state);

			if ($post_id) {
				if (array_key_exists($post_id, $this->pages_with_state)) {
					array_push($this->pages_with_state[$post_id], $state);
				} else {
					$this->pages_with_state[$post_id] = [$state];
				}
			}
		}
	}

	/**
	 * Adds page states in pages endpoint
	 */
	public function add_page_states()
	{
		$args = [
			'get_callback' => function ($post) {
				if (!array_key_exists($post['id'], $this->pages_with_state)) {
					return [];
				} else {
					return $this->pages_with_state[$post['id']];
				}
			}
		];

		register_rest_field('page', 'states', $args);
	}
}
