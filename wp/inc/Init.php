<?php

namespace Inc;

use Inc\Blocks\Blocks;
use Inc\Menus\Menus;
use Inc\Posts\Posts;
use Inc\Pages\Pages;
use Inc\Rest_Api\Rest_Api;
use Inc\Setup\Enqueue;
use Inc\Sidebars\Sidebars;
use Inc\Setup\Setup;

final class Init
{
	public static function get_services(): array
	{
		return [
			Setup::class,
			Enqueue::class,
			Sidebars::class,
			Menus::class,
			Posts::class,
			Pages::class,
			Blocks::class,
			Rest_Api::class
		];
	}

	private static function instantiate($class)
	{
		return new $class();
	}

	public static function register_services(): void
	{
		foreach (self::get_services() as $class) {
			self::instantiate($class);
		}
	}
}
