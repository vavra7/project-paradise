<?php

namespace Inc\Admin_Pages\Pages\Bio;

use Inc\Templates\General_Inputs;
use Inc\Assets\Assets;
use Inc\Helper_Trait;

class Handler
{
	use Helper_Trait;

	/**
	 * Sanitize user's input
	 */
	public function bio_sanitize_setting(array $input): array
	{
		$output = [
			Options::VALUE_KEYS['IMAGE'] => (int) $input[Options::VALUE_KEYS['IMAGE']],
			Options::VALUE_KEYS['TITLE'] => sanitize_text_field($input[Options::VALUE_KEYS['TITLE']]),
			Options::VALUE_KEYS['TEXT'] => sanitize_textarea_field($input[Options::VALUE_KEYS['TEXT']])
		];

		return $output;
	}

	/**
	 * Gets input field for image
	 */
	public function bio_image_input(array $args)
	{
		$new_args = array_merge($args, [
			'id' => $args['label_for'],
			'option_name' => sprintf('%s[%s]', $args['option_name'], $args['value_key']),
			'value' => $this->get_array_option($args['option_name'], $args['value_key']),
			'class' => 'regular-text',
			'default_src' => Assets::get_asset('avatar')['url']
		]);

		General_Inputs::render_img($new_args);
	}

	/**
	 * Gets input field for title
	 */
	public function bio_title_input(array $args)
	{
		$new_args = array_merge($args, [
			'id' => $args['label_for'],
			'option_name' => sprintf('%s[%s]', $args['option_name'], $args['value_key']),
			'value' => $this->get_array_option($args['option_name'], $args['value_key']),
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
			'id' => $args['label_for'],
			'option_name' => sprintf('%s[%s]', $args['option_name'], $args['value_key']),
			'value' => $this->get_array_option($args['option_name'], $args['value_key']),
			'class' => 'regular-text'
		]);

		General_Inputs::render_text_area($new_args);
	}
}
