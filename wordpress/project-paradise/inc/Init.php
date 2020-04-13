<?php

namespace Inc;

use Inc\Blocks\Blocks;
use Inc\Menus\Menus;
use Inc\Post_Types\Post_Types;
use Inc\Post_Types\Posts\Post;
use Inc\Post_Types\Posts\Post_En;
use Inc\Post_Types\Posts\Page;
use Inc\Post_Types\Posts\Page_En;
use Inc\Api\Api;
use Inc\Setup\Enqueue;
use Inc\Sidebars\Sidebars;
use Inc\Setup\Setup;
use Inc\Admin_Pages\Admin_Pages;

class Init
{
	/**
	 * Returns array of classes with services
	 */
	public static function get_services(): array
	{
		return [
			Setup::class,
			Enqueue::class,
			Sidebars::class,
			Menus::class,
			Post_Types::class,
			Post::class,
			Post_En::class,
			Page::class,
			Page_En::class,
			Blocks::class,
			Api::class,
			Admin_Pages::class,
		];
	}

	/**
	 * Creates class instances
	 */
	public static function register_services(): void
	{
		foreach (self::get_services() as $class) {
			new $class();
		}
	}
}
