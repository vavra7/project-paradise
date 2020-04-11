<?php

namespace Inc\Admin_Pages\Modules\Bio;

use Inc\Admin_Pages\Modules\Bio\Handler;

class Options
{
	public const OPTION_GROUP = 'bio';
	public const OPTION_GROUP_EN = 'bio_en';

	public const OPTION_NAME_US = 'bio_us';
	public const OPTION_NAME_T = 'bio_t';
	public const OPTION_NAME_K = 'bio_k';
	public const OPTION_NAME_US_EN = 'bio_us_en';
	public const OPTION_NAME_T_EN = 'bio_t_en';
	public const OPTION_NAME_K_EN = 'bio_k_en';

	public const SECTION_US = 'bio_us';
	public const SECTION_T = 'bio_t';
	public const SECTION_K = 'bio_k';
	public const SECTION_US_EN = 'bio_us_en';
	public const SECTION_T_EN = 'bio_t_en';
	public const SECTION_K_EN = 'bio_k_en';

	public const VALUE_KEY_IMAGE = 'image';
	public const VALUE_KEY_TITLE = 'title';
	public const VALUE_KEY_TEXT = 'text';

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
				'option_name' => self::OPTION_NAME_US,
				'args' => [
					'sanitize_callback' => [$this->handler, 'bio_sanitize_setting']
				]
			],
			[
				'option_group' => self::OPTION_GROUP,
				'option_name' => self::OPTION_NAME_T,
				'args' => [
					'sanitize_callback' => [$this->handler, 'bio_sanitize_setting']
				]
			],
			[
				'option_group' => self::OPTION_GROUP,
				'option_name' => self::OPTION_NAME_K,
				'args' => [
					'sanitize_callback' => [$this->handler, 'bio_sanitize_setting']
				]
			]
		];

		$settings_en = [
			[
				'option_group' => self::OPTION_GROUP_EN,
				'option_name' => self::OPTION_NAME_US_EN,
				'args' => [
					'sanitize_callback' => [$this->handler, 'bio_sanitize_setting']
				]
			],
			[
				'option_group' => self::OPTION_GROUP_EN,
				'option_name' => self::OPTION_NAME_T_EN,
				'args' => [
					'sanitize_callback' => [$this->handler, 'bio_sanitize_setting']
				]
			],
			[
				'option_group' => self::OPTION_GROUP_EN,
				'option_name' => self::OPTION_NAME_K_EN,
				'args' => [
					'sanitize_callback' => [$this->handler, 'bio_sanitize_setting']
				]
			]
		];

		$settings = array_merge($settings, $settings_en);

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
				'id' => self::SECTION_US,
				'title' => __('About Us', 'project-paradise'),
				'callback' => function () {
					_e('Settings of bio widget about website authors.', 'project-paradise');
				},
				'page' => Pages::PAGE
			],
			[
				'id' => self::SECTION_T,
				'title' => 'Tomáš',
				'callback' => function () {
					_e('Settings of bio widget about author Tomáš.', 'project-paradise');
				},
				'page' => Pages::PAGE
			],
			[
				'id' => self::SECTION_K,
				'title' => 'Klára',
				'callback' => function () {
					_e('Settings of bio widget about author Klára.', 'project-paradise');
				},
				'page' => Pages::PAGE
			]
		];

		$sections_en = [
			[
				'id' => self::SECTION_US_EN,
				'title' => __('About Us', 'project-paradise'),
				'callback' => function () {
					_e('Settings of bio widget about website authors.', 'project-paradise');
				},
				'page' => Pages::PAGE_EN
			],
			[
				'id' => self::SECTION_T_EN,
				'title' => 'Tomáš',
				'callback' => function () {
					_e('Settings of bio widget about author Tomáš.', 'project-paradise');
				},
				'page' => Pages::PAGE_EN
			],
			[
				'id' => self::SECTION_K_EN,
				'title' => 'Klára',
				'callback' => function () {
					_e('Settings of bio widget about author Klára.', 'project-paradise');
				},
				'page' => Pages::PAGE_EN
			]
		];

		$sections = array_merge($sections, $sections_en);

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
				'id' => 'image_us',
				'title'	=> __('Image', 'project-paradise'),
				'callback' => [$this->handler, 'bio_image_input'],
				'page' => Pages::PAGE,
				'section'	=> self::SECTION_US,
				'args' => [
					'label_for' => 'image_us',
					'option_name'	=> self::OPTION_NAME_US,
					'value_key' => self::VALUE_KEY_IMAGE
				]
			],
			[
				'id' => 'title_us',
				'title'	=> __('Title', 'project-paradise'),
				'callback' => [$this->handler, 'bio_title_input'],
				'page' => Pages::PAGE,
				'section'	=> self::SECTION_US,
				'args' => [
					'label_for' => 'title_us',
					'option_name'	=> self::OPTION_NAME_US,
					'value_key' => self::VALUE_KEY_TITLE
				]
			],
			[
				'id' => 'text_us',
				'title'	=> __('Text', 'project-paradise'),
				'callback' => [$this->handler, 'bio_text_input'],
				'page' => Pages::PAGE,
				'section'	=> self::SECTION_US,
				'args' => [
					'label_for' => 'text_us',
					'option_name'	=> self::OPTION_NAME_US,
					'value_key' => self::VALUE_KEY_TEXT
				]
			],
			[
				'id' => 'image_t',
				'title'	=> __('Image', 'project-paradise'),
				'callback' => [$this->handler, 'bio_image_input'],
				'page' => Pages::PAGE,
				'section'	=> self::SECTION_T,
				'args' => [
					'label_for' => 'image_t',
					'option_name'	=> self::OPTION_NAME_T,
					'value_key' => self::VALUE_KEY_IMAGE
				]
			],
			[
				'id' => 'title_t',
				'title'	=> __('Title', 'project-paradise'),
				'callback' => [$this->handler, 'bio_title_input'],
				'page' => Pages::PAGE,
				'section'	=> self::SECTION_T,
				'args' => [
					'label_for' => 'title_t',
					'option_name'	=> self::OPTION_NAME_T,
					'value_key' => self::VALUE_KEY_TITLE
				]
			],
			[
				'id' => 'text_t',
				'title'	=> __('Text', 'project-paradise'),
				'callback' => [$this->handler, 'bio_text_input'],
				'page' => Pages::PAGE,
				'section'	=> self::SECTION_T,
				'args' => [
					'label_for' => 'text_t',
					'option_name'	=> self::OPTION_NAME_T,
					'value_key' => self::VALUE_KEY_TEXT
				]
			],
			[
				'id' => 'image_k',
				'title'	=> __('Image', 'project-paradise'),
				'callback' => [$this->handler, 'bio_image_input'],
				'page' => Pages::PAGE,
				'section'	=> self::SECTION_K,
				'args' => [
					'label_for' => 'image_k',
					'option_name'	=> self::OPTION_NAME_K,
					'value_key' => self::VALUE_KEY_IMAGE
				]
			],
			[
				'id' => 'title_k',
				'title'	=> __('Title', 'project-paradise'),
				'callback' => [$this->handler, 'bio_title_input'],
				'page' => Pages::PAGE,
				'section'	=> self::SECTION_K,
				'args' => [
					'label_for' => 'title_k',
					'option_name'	=> self::OPTION_NAME_K,
					'value_key' => self::VALUE_KEY_TITLE
				]
			],
			[
				'id' => 'text_k',
				'title'	=> __('Text', 'project-paradise'),
				'callback' => [$this->handler, 'bio_text_input'],
				'page' => Pages::PAGE,
				'section'	=> self::SECTION_K,
				'args' => [
					'label_for' => 'text_k',
					'option_name'	=> self::OPTION_NAME_K,
					'value_key' => self::VALUE_KEY_TEXT
				]
			],
		];

		$fields_en = [
			[
				'id' => 'image_us',
				'title'	=> __('Image', 'project-paradise'),
				'callback' => [$this->handler, 'bio_image_input'],
				'page' => Pages::PAGE_EN,
				'section'	=> self::SECTION_US_EN,
				'args' => [
					'label_for' => 'image_us',
					'option_name'	=> self::OPTION_NAME_US_EN,
					'value_key' => self::VALUE_KEY_IMAGE
				]
			],
			[
				'id' => 'title_us',
				'title'	=> __('Title', 'project-paradise'),
				'callback' => [$this->handler, 'bio_title_input'],
				'page' => Pages::PAGE_EN,
				'section'	=> self::SECTION_US_EN,
				'args' => [
					'label_for' => 'title_us',
					'option_name'	=> self::OPTION_NAME_US_EN,
					'value_key' => self::VALUE_KEY_TITLE
				]
			],
			[
				'id' => 'text_us',
				'title'	=> __('Text', 'project-paradise'),
				'callback' => [$this->handler, 'bio_text_input'],
				'page' => Pages::PAGE_EN,
				'section'	=> self::SECTION_US_EN,
				'args' => [
					'label_for' => 'text_us',
					'option_name'	=> self::OPTION_NAME_US_EN,
					'value_key' => self::VALUE_KEY_TEXT
				]
			],
			[
				'id' => 'image_t',
				'title'	=> __('Image', 'project-paradise'),
				'callback' => [$this->handler, 'bio_image_input'],
				'page' => Pages::PAGE_EN,
				'section'	=> self::SECTION_T_EN,
				'args' => [
					'label_for' => 'image_t',
					'option_name'	=> self::OPTION_NAME_T_EN,
					'value_key' => self::VALUE_KEY_IMAGE
				]
			],
			[
				'id' => 'title_t',
				'title'	=> __('Title', 'project-paradise'),
				'callback' => [$this->handler, 'bio_title_input'],
				'page' => Pages::PAGE_EN,
				'section'	=> self::SECTION_T_EN,
				'args' => [
					'label_for' => 'title_t',
					'option_name'	=> self::OPTION_NAME_T_EN,
					'value_key' => self::VALUE_KEY_TITLE
				]
			],
			[
				'id' => 'text_t',
				'title'	=> __('Text', 'project-paradise'),
				'callback' => [$this->handler, 'bio_text_input'],
				'page' => Pages::PAGE_EN,
				'section'	=> self::SECTION_T_EN,
				'args' => [
					'label_for' => 'text_t',
					'option_name'	=> self::OPTION_NAME_T_EN,
					'value_key' => self::VALUE_KEY_TEXT
				]
			],
			[
				'id' => 'image_k',
				'title'	=> __('Image', 'project-paradise'),
				'callback' => [$this->handler, 'bio_image_input'],
				'page' => Pages::PAGE_EN,
				'section'	=> self::SECTION_K_EN,
				'args' => [
					'label_for' => 'image_k',
					'option_name'	=> self::OPTION_NAME_K_EN,
					'value_key' => self::VALUE_KEY_IMAGE
				]
			],
			[
				'id' => 'title_k',
				'title'	=> __('Title', 'project-paradise'),
				'callback' => [$this->handler, 'bio_title_input'],
				'page' => Pages::PAGE_EN,
				'section'	=> self::SECTION_K_EN,
				'args' => [
					'label_for' => 'title_k',
					'option_name'	=> self::OPTION_NAME_K_EN,
					'value_key' => self::VALUE_KEY_TITLE
				]
			],
			[
				'id' => 'text_k',
				'title'	=> __('Text', 'project-paradise'),
				'callback' => [$this->handler, 'bio_text_input'],
				'page' => Pages::PAGE_EN,
				'section'	=> self::SECTION_K_EN,
				'args' => [
					'label_for' => 'text_k',
					'option_name'	=> self::OPTION_NAME_K_EN,
					'value_key' => self::VALUE_KEY_TEXT
				]
			],
		];

		$fields = array_merge($fields, $fields_en);

		foreach ($fields as $field) {
			add_settings_field(...array_values($field));
		}
	}
}
