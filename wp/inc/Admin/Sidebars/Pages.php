<?php

namespace Inc\Admin\Sidebars;

class Pages
{
	const PAGE = 'sidebars';

	/**
	 * Register sidebars page
	 */
	public function register_page()
	{
		$page = [
			'page_title' => 'Sidebars',
			'menu_title' => 'Sidebars',
			'capability' => 'manage_options',
			'menu_slug' => self::PAGE,
			'callback' => function () {
				require_once(get_template_directory() . '/inc/Templates/Pages/sidebars.php');
			},
			'position' => 2,
		];

		add_theme_page(...array_values($page));
	}
}
