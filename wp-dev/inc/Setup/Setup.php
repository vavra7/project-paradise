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
			'desktop_top_menu' => 'Desktop Top Menu',
			'mobile_bottom_menu' => 'Mobile Bottom Menu'
		]);
	}
}
