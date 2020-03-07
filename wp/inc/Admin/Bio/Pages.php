<?php

namespace Inc\Admin\Bio;

class Pages
{
	const PAGE = 'bio';

	/**
	 * register page for widget bio
	 */
	public function register_page()
	{
		$page = [
			'page_title' => 'Bio',
			'menu_title' => 'Bio',
			'capability' => 'manage_options',
			'menu_slug' => self::PAGE,
			'callback' => function () {
				require_once(get_template_directory() . '/inc/Templates/Pages/sidebars.php');
			},
			'position' => 4,
		];

		add_theme_page(...array_values($page));
	}
}
