<?php

namespace Inc;

final class Init
{
	public static function get_services(): array
	{
		return [
			Setup\Setup::class,
			Api\Api::class
		];
	}

	private static function instantiate($class)
	{
		return new $class();
	}

	public static function register_services(): void
	{
		foreach (self::get_services() as $class) {
			$service = self::instantiate($class);
			if (method_exists($service, 'register')) {
				$service->register();
			}
		}
	}
}
