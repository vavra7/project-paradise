<?php

namespace Inc\Templates;

class General_Parts
{
	/**
	 * Get empty option for select box
	 */
	public static function get_empty_option($empty_value = '')
	{
		return [
			'label' => __('— Select —', 'project-paradise'),
			'value' => $empty_value
		];
	}
}
