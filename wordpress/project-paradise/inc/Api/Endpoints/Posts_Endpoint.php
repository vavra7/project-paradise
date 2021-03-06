<?php

namespace Inc\Api\Endpoints;

use Inc\Api\Includes\Url_Extractor;

class Posts_Endpoint
{
	use Url_Extractor;

	/**
	 * Adds blocks in post endpoint
	 */
	public function add_field_blocks(): void
	{
		$args = [
			'get_callback' => function (array $response_post) {
				$post = get_post($response_post['id']);

				$filterEmptyBlocks = function (array $block) {
					return $block['blockName'] !== null;
				};

				$blocks = parse_blocks($post->post_content);
				$filtered_blocks = array_values(array_filter($blocks, $filterEmptyBlocks));

				return $filtered_blocks;
			}
		];

		register_rest_field('post', 'blocks', $args);
	}

	/**
	 * Adds path used for render link in Gatsby
	 */
	public function add_field_path()
	{
		$args = [
			'get_callback' => function ($response_post) {
				$permalink = get_permalink($response_post['id']);
				$path = $this->get_path_from_url($permalink);

				return $path;
			}

		];

		register_rest_field('post', 'path', $args);
	}
}
