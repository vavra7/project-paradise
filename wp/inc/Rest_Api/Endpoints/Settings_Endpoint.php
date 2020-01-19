<?php

namespace Inc\Rest_Api\Endpoints;

class Settings_Endpoint
{
	/**
	 * Adds show_on_front in setting endpoint.
	 * It gives values 'page' or 'posts'
	 */
	public function add_field_show_on_front($result)
	{
		if ($_SERVER['REQUEST_URI'] === '/wp-json/wp/v2/settings') {
			$result['show_on_front'] = get_option('show_on_front');
		}

		return $result;
	}
}
