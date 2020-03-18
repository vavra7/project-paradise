<?php

namespace Inc\Admin\Modules\Bio;

use Inc\Templates\General_Inputs;
use Inc\Admin\Includes\Helper;

class Handler
{
	private $helper;

	function __construct()
	{
		$this->helper = new Helper;
	}

	/**
	 * Sanitize user's input
	 */
	public function bio_sanitize_setting(array $input): array
	{
		$output = [
			Options::VALUE_KEY_TITLE => sanitize_text_field($input[Options::VALUE_KEY_TITLE]),
			Options::VALUE_KEY_TEXT => sanitize_textarea_field($input[Options::VALUE_KEY_TEXT])
		];

		if (array_key_exists(Options::VALUE_KEY_IMAGE, $input)) {
			$output[Options::VALUE_KEY_IMAGE] = $input[Options::VALUE_KEY_IMAGE];
		}

		return $output;
	}

	/**
	 * Gets input field for image
	 */
	public function bio_image_input(array $args)
	{
		$new_args = array_merge($args, [
			'option_name' => sprintf('%s[%s]', $args['option_name'], $args['value_key']),
			'value' => $this->helper->get_array_option($args['option_name'], $args['value_key']),
			'class' => 'regular-text'
		]);

		General_Inputs::render_img($new_args);
	}

	/**
	 * Gets input field for title
	 */
	public function bio_title_input(array $args)
	{
		$new_args = array_merge($args, [
			'option_name' => sprintf('%s[%s]', $args['option_name'], $args['value_key']),
			'value' => $this->helper->get_array_option($args['option_name'], $args['value_key']),
			'class' => 'regular-text'
		]);

		General_Inputs::render_text_input($new_args);
	}

	/**
	 * Gets input field for text
	 */
	public function bio_text_input(array $args)
	{
		$new_args = array_merge($args, [
			'option_name' => sprintf('%s[%s]', $args['option_name'], $args['value_key']),
			'value' => $this->helper->get_array_option($args['option_name'], $args['value_key']),
			'class' => 'regular-text'
		]);

		General_Inputs::render_text_area($new_args);
	}
}
