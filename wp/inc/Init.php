<?php

namespace Inc;

final class Init
{
	public static function get_services(): array
	{
		return [
			Setup\Setup::class,
			Setup\Enqueue::class,
			Core\Menus::class,
			Blocks\Blocks::class,
			Api\Api::class,
			Api\Routes\Pages_Route::class,
			Api\Routes\Posts_Route::class,
			Api\Routes\Menus_Route::class,
			Api\Routes\Generate_Token_Route::class
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
