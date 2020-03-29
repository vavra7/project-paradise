<?php

namespace Inc\Admin\Modules\Bio;

class Pages
{
	const PAGE = 'bio';

	/**
	 * register page for widget bio
	 */
	public function register_page()
	{
		$page = [
			'page_title' => __('Bio', 'project-paradise'),
			'menu_title' => __('Bio', 'project-paradise'),
			'capability' => 'manage_options',
			'menu_slug' => self::PAGE,
			'callback' => function () {
				require_once(get_template_directory() . '/inc/Templates/Pages/bio.php');
			},
			'position' => 4,
		];

		add_theme_page(...array_values($page));
	}
}
