<?php

namespace Inc\Admin_Pages\Pages\Bio;

class Pages
{
	const PAGE = 'bio';
	const PAGE_EN = 'bio-en';

	/**
	 * register pages for widget bio
	 */
	public function register_pages()
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

		$submenu_page = [
			'parent_slug' => '',
			'page_title' => '',
			'menu_title' => '',
			'capability' => 'manage_options',
			'menu_slug' => self::PAGE_EN,
			'callback' => function () {
				require_once(get_template_directory() . '/inc/Templates/Pages/bio-en.php');
			},
			'position' => 0
		];


		add_theme_page(...array_values($page));
		add_submenu_page(...array_values($submenu_page));
	}
}
