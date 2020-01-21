<?php

namespace Inc\Rest_Api\Endpoints;

class Settings_Endpoint
{
	public const OPTION_GROUP = 'custom_settings';
	public const TAG_BASE = 'tag_base';

	/**
	 * Adds show_on_front in setting endpoint.
	 * It gives values 'page' or 'posts'
	 */
	public function add_field_show_on_front()
	{
		$args = array(
			'type' => 'string',
			'default' => get_option('show_on_front'),
			'show_in_rest' => true,
		);
		register_setting(self::OPTION_GROUP, 'show_on_front', $args);
	}

	/**
	 * Adds tag_base field
	 */
	public function add_field_tag_base()
	{
		$args = array(
			'type' => 'string',
			'show_in_rest' => true,
			'default' => get_option('tag_base'),
		);
		register_setting(self::OPTION_GROUP, self::TAG_BASE, $args);
	}

	/**
	 * Assigns default value if field empty
	 */
	public function default_value_for_fields($response)
	{
		if ($_SERVER['REQUEST_URI'] === '/wp-json/wp/v2/settings') {
			if (array_key_exists(self::TAG_BASE, $response) && !$response[self::TAG_BASE]) {
				$response[self::TAG_BASE] = 'tag';
			}
		}

		return $response;
	}
}
