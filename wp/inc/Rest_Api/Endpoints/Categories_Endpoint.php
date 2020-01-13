<?php

namespace Inc\Rest_Api\Endpoints;

use Inc\Rest_Api\Includes\Url_Extractor;

class Categories_Endpoint
{
	use Url_Extractor;

	/**
	 * Adds path used for render link in Gatsby
	 */
	public function add_field_path()
	{
		$args = [
			'get_callback' => function (array $response_category) {
				$permalink = get_category_link($response_category['id']);
				$path = $this->get_path_from_url($permalink);

				return $path;
			}
		];

		register_rest_field('category', 'path', $args);
	}
}
