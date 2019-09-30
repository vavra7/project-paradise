<?php

namespace Inc\Setup;

final class Setup
{
	public function register(): void
	{
		add_action('after_setup_theme', [$this, 'menus']);
	}

	public function menus(): void
	{
		register_nav_menus([
			'main_menu' => 'Main Menu',
			'secondary_menu' => 'Secondary Menu',
			'footer_menu' => 'Footer Menu'
		]);
	}
}
