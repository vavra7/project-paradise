<?php

namespace Inc\Rest_Api\Endpoints;

class Settings_Endpoint
{
	public const OPTION_GROUP = 'custom_settings';

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
			'default' => get_option('tag_base') ?: 'tag',
			'show_in_rest' => true,
		);
		register_setting(self::OPTION_GROUP, 'tag_base', $args);
	}
}
