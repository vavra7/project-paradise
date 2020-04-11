<?php

namespace Inc\Admin_Pages\Modules\Sidebars;

class Pages
{
	const PAGE = 'sidebars';

	/**
	 * Register sidebars page
	 */
	public function register_pages()
	{
		$page = [
			'page_title' => __('Sidebars', 'project-paradise'),
			'menu_title' => __('Sidebars', 'project-paradise'),
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
