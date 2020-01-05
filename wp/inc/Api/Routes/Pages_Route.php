<?php

namespace Inc\Api\Routes;

use Inc\Api\Utils\Url_Extractor;

class Pages_Route
{
	use Url_Extractor;

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
		add_action('rest_api_init', [$this, 'add_path']);
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
				$this->pages_with_state[$post_id][] = $state;
			}
		}
	}

	/**
	 * Adds page states in pages endpoint
	 */
	public function add_page_states()
	{
		$args = [
			'get_callback' => function ($response_post) {
				if (!array_key_exists($response_post['id'], $this->pages_with_state)) {
					return [];
				} else {
					return $this->pages_with_state[$response_post['id']];
				}
			}
		];

		register_rest_field('page', 'states', $args);
	}

	/**
	 * Adds path used for render link in Gatsby
	 */
	public function add_path()
	{
		$args = [
			'get_callback' => function (array $response_post): string {
				if (array_key_exists($response_post['id'], $this->pages_with_state) && in_array('page_on_front', $this->pages_with_state[$response_post['id']])) {
					return '/';
				}

				$permalink = get_permalink($response_post['id']);
				$path = $this->get_path_from_url($permalink);

				return $path;
			}
		];

		register_rest_field('page', 'path', $args);
	}
}
