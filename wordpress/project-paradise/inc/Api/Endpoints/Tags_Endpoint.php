<?php

namespace Inc\Api\Endpoints;

use Inc\Api\Includes\Url_Extractor;

class Tags_Endpoint
{
	use Url_Extractor;

	/**
	 * Adds path used for render link in Gatsby
	 */
	public function add_field_path()
	{
		$args = [
			'get_callback' => function ($response_post) {
				$permalink = get_tag_link($response_post['id']);
				$path = $this->get_path_from_url($permalink);

				return $path;
			}

		];

		register_rest_field('tag', 'path', $args);
	}
}
