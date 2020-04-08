<?php

namespace Inc;

use Inc\Blocks\Blocks;
use Inc\Menus\Menus;
use Inc\Post_Types\Posts;
use Inc\Post_Types\Pages;
use Inc\Api\Api;
use Inc\Setup\Enqueue;
use Inc\Sidebars\Sidebars;
use Inc\Setup\Setup;
use Inc\Admin_Pages\Admin_Pages;

class Init
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
			Api::class,
			Admin_Pages::class,
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
