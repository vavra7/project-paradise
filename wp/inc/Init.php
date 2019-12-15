<?php

namespace Inc;

final class Init
{
	public static function get_services(): array
	{
		return [
			Setup\Setup::class,
			Core\Menus::class,
			Blocks\Blocks::class,
			Api\Posts_Api::class,
			Api\Menus_Api::class
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
