<?php

namespace Inc\Admin\Modules\Bio;

use Inc\Admin\Modules\Bio\Handler;

class Options
{
	public const OPTION_GROUP = 'bio';

	public const OPTION_NAME_US = 'bio_us';
	public const OPTION_NAME_T = 'bio_t';
	public const OPTION_NAME_K = 'bio_k';

	public const SECTION_US = 'bio_us';
	public const SECTION_T = 'bio_t';
	public const SECTION_K = 'bio_k';

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
				'title' => __('About Us', TEXT_DOMAIN),
				'callback' => function () {
					_e('Settings of bio widget about website authors.', TEXT_DOMAIN);
				},
				'page' => Pages::PAGE
			],
			[
				'id' => self::SECTION_T,
				'title' => 'Tomáš',
				'callback' => function () {
					_e('Settings of bio widget about author Tomáš.', TEXT_DOMAIN);
				},
				'page' => Pages::PAGE
			],
			[
				'id' => self::SECTION_K,
				'title' => 'Klára',
				'callback' => function () {
					_e('Settings of bio widget about author Klára.', TEXT_DOMAIN);
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
				'id' => 'image_us',
				'title'	=> __('Image', TEXT_DOMAIN),
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
				'title'	=> __('Title', TEXT_DOMAIN),
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
				'title'	=> __('Text', TEXT_DOMAIN),
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
				'title'	=> __('Image', TEXT_DOMAIN),
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
				'title'	=> __('Title', TEXT_DOMAIN),
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
				'title'	=> __('Text', TEXT_DOMAIN),
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
				'title'	=> __('Image', TEXT_DOMAIN),
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
				'title'	=> __('Title', TEXT_DOMAIN),
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
				'title'	=> __('Text', TEXT_DOMAIN),
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

		foreach ($fields as $field) {
			add_settings_field(...array_values($field));
		}
	}
}
