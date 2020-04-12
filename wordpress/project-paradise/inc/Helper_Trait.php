<?php

namespace Inc;

trait Helper_Trait
{
	/**
	 * gets value from array option
	 */
	public function get_array_option(string $option_name, string $value_key, $default = '')
	{
		$option = get_option($option_name, []);
		if (array_key_exists($value_key, $option)) {
			return $option[$value_key];
		} else {
			return $default;
		}
	}
}
