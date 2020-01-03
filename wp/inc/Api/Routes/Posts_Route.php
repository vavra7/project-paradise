<?php

namespace Inc\Api\Routes;

class Posts_Route
{
	function __construct()
	{
		add_action('rest_api_init', [$this, 'add_blocks']);
	}

	/**
	 * Returns parsed blocks
	 */
	public function get_blocks(array $post)
	{
		$filterEmptyBlocks = function (array $block) {
			return $block['blockName'] !== null;
		};

		$blocks = parse_blocks($post['content']['raw']);
		$filtered_blocks = array_values(array_filter($blocks, $filterEmptyBlocks));

		return $filtered_blocks;
	}


	/**
	 * Adds blocks in post endpoint
	 */
	public function add_blocks()
	{
		$args = [
			'get_callback' => [$this, 'get_blocks']
		];

		register_rest_field('post', 'blocks', $args);
	}
}
