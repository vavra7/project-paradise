<?php

namespace Inc\Admin_Pages\Pages\Sidebars;

use Inc\Admin_Pages\Pages\Sidebars\Handler;

class Options
{
	public const OPTION_GROUP = 'default_sidebars';
	public const OPTION_NAME = 'default_sidebars';
	public const SECTION = 'default_sidebars';
	public const VALUE_KEYS = [
		'POSTS' => 'posts',
		'POSTS_EN' => 'posts_en',
		'BLOG' => 'blog'
	];

	private $handler;

	function __construct()
	{
		$this->handler = new Handler;
	}

	/**
	 * Register settings
	 */
	public function register_settings()
	{
		$settings = [
			[
				'option_group' => self::OPTION_GROUP,
				'option_name' => self::OPTION_NAME,
				'args' => [
					'show_in_rest' => false
				]
			]
		];

		foreach ($settings as $setting) {
			register_setting(...array_values($setting));
		}
	}

	/**
	 * Register sections
	 */
	public function register_sections()
	{
		$sections = [
			[
				'id' => self::SECTION,
				'title' => __('Default Sidebars', 'project-paradise'),
				'callback' => function () {
					_e('Choose from select boxes which sidebar will be used as default on particular pages.', 'project-paradise');
				},
				'page' => Pages::PAGE
			]
		];

		foreach ($sections as $section) {
			add_settings_section(...array_values($section));
		}
	}

	/**
	 * Register fields
	 */
	public function register_fields()
	{
		$fields = [
			[
				'id' => self::VALUE_KEYS['POSTS'],
				'title'	=> __('Posts', 'project-paradise'),
				'callback' => [$this->handler, 'default_sidebar_select'],
				'page' => Pages::PAGE,
				'section'	=> self::SECTION,
				'args' => [
					'label_for' => self::VALUE_KEYS['POSTS'],
					'option_name'	=> self::OPTION_NAME,
				]
			],
			[
				'id' => self::VALUE_KEYS['POSTS_EN'],
				'title'	=> __('Posts (en)', 'project-paradise'),
				'callback' => [$this->handler, 'default_sidebar_select'],
				'page' => Pages::PAGE,
				'section'	=> self::SECTION,
				'args' => [
					'label_for' => self::VALUE_KEYS['POSTS_EN'],
					'option_name'	=> self::OPTION_NAME,
				]
			],
			[
				'id' => self::VALUE_KEYS['BLOG'],
				'title'	=> __('Blog', 'project-paradise'),
				'callback' => [$this->handler, 'default_sidebar_select'],
				'page' => Pages::PAGE,
				'section'	=> self::SECTION,
				'args' => [
					'label_for' => self::VALUE_KEYS['BLOG'],
					'option_name'	=> self::OPTION_NAME,
				]
			]
		];

		foreach ($fields as $field) {
			add_settings_field(...array_values($field));
		}
	}
}
