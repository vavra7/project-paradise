<?php

namespace Inc\Setup;

final class Setup
{
	function __construct()
	{
		add_action('after_setup_theme', [$this, 'menus']);
		add_action('after_setup_theme', [$this, 'themeSupport']);
	}

	public function menus(): void
	{
		register_nav_menus([
			'desktop_top_menu' => 'Desktop Top Menu',
			'mobile_bottom_menu' => 'Mobile Bottom Menu'
		]);
	}

	public function themeSupport()
	{
		add_theme_support('post-thumbnails');
	}
}
