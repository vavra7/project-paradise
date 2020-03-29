<?php

namespace Inc\Admin\Modules\Sidebars;

use Inc\Admin\Modules\Sidebars\Handler;

class Options
{
	public const OPTION_GROUP = 'default_sidebars';
	public const OPTION_NAME = 'default_sidebars';
	public const SECTION = 'default_sidebars';

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
				'id' => 'post',
				'title'	=> __('Post', 'project-paradise'),
				'callback' => [$this->handler, 'default_sidebar_select'],
				'page' => Pages::PAGE,
				'section'	=> self::SECTION,
				'args' => [
					'label_for' => 'post',
					'option_name'	=> self::OPTION_NAME,
				]
			],
			[
				'id' => 'blog',
				'title'	=> __('Blog', 'project-paradise'),
				'callback' => [$this->handler, 'default_sidebar_select'],
				'page' => Pages::PAGE,
				'section'	=> self::SECTION,
				'args' => [
					'label_for' => 'blog',
					'option_name'	=> self::OPTION_NAME,
				]
			]
		];

		foreach ($fields as $field) {
			add_settings_field(...array_values($field));
		}
	}
}
