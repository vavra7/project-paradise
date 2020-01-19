<?php

namespace Inc\Rest_Api\Endpoints;

class Settings_Endpoint
{
	/**
	 * Adds show_on_front in setting endpoint.
	 * It gives values 'page' or 'posts'
	 */
	public function add_custom_fields($result)
	{
		if ($_SERVER['REQUEST_URI'] === '/wp-json/wp/v2/settings') {
			$result['show_on_front'] = get_option('show_on_front');
			$result['tag_base'] = get_option('tag_base');
		}

		return $result;
	}
}
