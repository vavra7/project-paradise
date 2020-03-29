<?php

namespace Inc\Assets;

final class Assets
{
	/**
	 * Returns single asset
	 */
	static function get_asset($asset)
	{
		return self::get_all_assets()[$asset];
	}

	/**
	 * Returns all assets
	 */
	static function get_all_assets(): array
	{
		return [
			'avatar' => [
				'url' => get_template_directory_uri() . '/assets/avatar.png'
			]
		];
	}
}
