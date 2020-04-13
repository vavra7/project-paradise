<?php

namespace Inc\Admin_Pages\Pages\Bio;

use Inc\Admin_Pages\Pages\Bio\Handler;

class Options
{
	public const OPTIONS = [
		'GROUPS' => [
			'CZ' => 'bio',
			'EN' => 'bio_en',
		],
		'NAMES' => [
			'US' => 'bio_us',
			'US_EN' => 'bio_us_en',
			'T' => 'bio_t',
			'T_EN' => 'bio_t_en',
			'K' => 'bio_k',
			'K_EN' => 'bio_k_en',
		],
	];

	public const SECTIONS = [
		'US' => 'bio_us',
		'US_EN' => 'bio_us_en',
		'T' => 'bio_t',
		'T_EN' => 'bio_t_en',
		'K' => 'bio_k',
		'K_EN' => 'bio_k_en'
	];

	public const VALUE_KEYS = [
		'IMAGE' => 'image',
		'TITLE' => 'title',
		'TEXT' => 'text'
	];

	private $handler;

	public function __construct()
	{
		$this->handler = new Handler;
	}

	/**
	 * Returns array of all bio options with translations
	 */
	public function get_bio_options(): array
	{
		$options = [
			[
				'id' => self::OPTIONS['NAMES']['US'],
				'label' => __('O nás', 'project-paradise')
			],
			[
				'id' => self::OPTIONS['NAMES']['US_EN'],
				'label' => __('O nás (en)', 'project-paradise')
			],
			[
				'id' => self::OPTIONS['NAMES']['T'],
				'label' => __('Tomáš', 'project-paradise')
			],
			[
				'id' => self::OPTIONS['NAMES']['T_EN'],
				'label' => __('Tomáš (en)', 'project-paradise')
			],
			[
				'id' => self::OPTIONS['NAMES']['K'],
				'label' => __('Klára', 'project-paradise')
			],
			[
				'id' => self::OPTIONS['NAMES']['K_EN'],
				'label' => __('Klára (en)', 'project-paradise')
			],
		];

		return $options;
	}

	/**
	 * Register settings
	 */
	public function register_settings()
	{
		$settings = [
			[
				'option_group' => self::OPTIONS['GROUPS']['CZ'],
				'option_name' => self::OPTIONS['NAMES']['US'],
				'args' => [
					'sanitize_callback' => [$this->handler, 'bio_sanitize_setting'],
				],
			],
			[
				'option_group' => self::OPTIONS['GROUPS']['CZ'],
				'option_name' => self::OPTIONS['NAMES']['T'],
				'args' => [
					'sanitize_callback' => [$this->handler, 'bio_sanitize_setting'],
				],
			],
			[
				'option_group' => self::OPTIONS['GROUPS']['CZ'],
				'option_name' => self::OPTIONS['NAMES']['K'],
				'args' => [
					'sanitize_callback' => [$this->handler, 'bio_sanitize_setting'],
				],
			],
		];

		$settings_en = [
			[
				'option_group' => self::OPTIONS['GROUPS']['EN'],
				'option_name' => self::OPTIONS['NAMES']['US_EN'],
				'args' => [
					'sanitize_callback' => [$this->handler, 'bio_sanitize_setting'],
				],
			],
			[
				'option_group' => self::OPTIONS['GROUPS']['EN'],
				'option_name' => self::OPTIONS['NAMES']['T_EN'],
				'args' => [
					'sanitize_callback' => [$this->handler, 'bio_sanitize_setting'],
				],
			],
			[
				'option_group' => self::OPTIONS['GROUPS']['EN'],
				'option_name' => self::OPTIONS['NAMES']['K_EN'],
				'args' => [
					'sanitize_callback' => [$this->handler, 'bio_sanitize_setting'],
				],
			],
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
		$description_us = __('Settings of bio widget about website authors.', 'project-paradise');
		$description_t = __('Settings of bio widget about author Tomáš.', 'project-paradise');
		$description_k = __('Settings of bio widget about author Klára.', 'project-paradise');

		$sections = [
			[
				'id' => self::SECTIONS['US'],
				'title' => __('About Us', 'project-paradise'),
				'callback' => function () use ($description_us) {
					echo $description_us;
				},
				'page' => Pages::PAGE,
			],
			[
				'id' => self::SECTIONS['T'],
				'title' => 'Tomáš',
				'callback' => function () use ($description_t) {
					echo $description_t;
				},
				'page' => Pages::PAGE,
			],
			[
				'id' => self::SECTIONS['K'],
				'title' => 'Klára',
				'callback' => function () use ($description_k) {
					echo $description_k;
				},
				'page' => Pages::PAGE,
			],
		];

		$sections_en = [
			[
				'id' => self::SECTIONS['US_EN'],
				'title' => __('About Us', 'project-paradise'),
				'callback' => function () use ($description_us) {
					echo $description_us;
				},
				'page' => Pages::PAGE_EN,
			],
			[
				'id' => self::SECTIONS['T_EN'],
				'title' => 'Tomáš',
				'callback' => function () use ($description_t) {
					echo $description_t;
				},
				'page' => Pages::PAGE_EN,
			],
			[
				'id' => self::SECTIONS['K_EN'],
				'title' => 'Klára',
				'callback' => function () use ($description_k) {
					echo $description_k;
				},
				'page' => Pages::PAGE_EN,
			],
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
				'title' => __('Image', 'project-paradise'),
				'callback' => [$this->handler, 'bio_image_input'],
				'page' => Pages::PAGE,
				'section' => self::SECTIONS['US'],
				'args' => [
					'label_for' => 'image_us',
					'option_name' => self::OPTIONS['NAMES']['US'],
					'value_key' => self::VALUE_KEYS['IMAGE'],
				],
			],
			[
				'id' => 'title_us',
				'title' => __('Title', 'project-paradise'),
				'callback' => [$this->handler, 'bio_title_input'],
				'page' => Pages::PAGE,
				'section' => self::SECTIONS['US'],
				'args' => [
					'label_for' => 'title_us',
					'option_name' => self::OPTIONS['NAMES']['US'],
					'value_key' => self::VALUE_KEYS['TITLE'],
				],
			],
			[
				'id' => 'text_us',
				'title' => __('Text', 'project-paradise'),
				'callback' => [$this->handler, 'bio_text_input'],
				'page' => Pages::PAGE,
				'section' => self::SECTIONS['US'],
				'args' => [
					'label_for' => 'text_us',
					'option_name' => self::OPTIONS['NAMES']['US'],
					'value_key' => self::VALUE_KEYS['TEXT'],
				],
			],
			[
				'id' => 'image_t',
				'title' => __('Image', 'project-paradise'),
				'callback' => [$this->handler, 'bio_image_input'],
				'page' => Pages::PAGE,
				'section' => self::SECTIONS['T'],
				'args' => [
					'label_for' => 'image_t',
					'option_name' => self::OPTIONS['NAMES']['T'],
					'value_key' => self::VALUE_KEYS['IMAGE'],
				],
			],
			[
				'id' => 'title_t',
				'title' => __('Title', 'project-paradise'),
				'callback' => [$this->handler, 'bio_title_input'],
				'page' => Pages::PAGE,
				'section' => self::SECTIONS['T'],
				'args' => [
					'label_for' => 'title_t',
					'option_name' => self::OPTIONS['NAMES']['T'],
					'value_key' => self::VALUE_KEYS['TITLE'],
				],
			],
			[
				'id' => 'text_t',
				'title' => __('Text', 'project-paradise'),
				'callback' => [$this->handler, 'bio_text_input'],
				'page' => Pages::PAGE,
				'section' => self::SECTIONS['T'],
				'args' => [
					'label_for' => 'text_t',
					'option_name' => self::OPTIONS['NAMES']['T'],
					'value_key' => self::VALUE_KEYS['TEXT'],
				],
			],
			[
				'id' => 'image_k',
				'title' => __('Image', 'project-paradise'),
				'callback' => [$this->handler, 'bio_image_input'],
				'page' => Pages::PAGE,
				'section' => self::SECTIONS['K'],
				'args' => [
					'label_for' => 'image_k',
					'option_name' => self::OPTIONS['NAMES']['K'],
					'value_key' => self::VALUE_KEYS['IMAGE'],
				],
			],
			[
				'id' => 'title_k',
				'title' => __('Title', 'project-paradise'),
				'callback' => [$this->handler, 'bio_title_input'],
				'page' => Pages::PAGE,
				'section' => self::SECTIONS['K'],
				'args' => [
					'label_for' => 'title_k',
					'option_name' => self::OPTIONS['NAMES']['K'],
					'value_key' => self::VALUE_KEYS['TITLE'],
				],
			],
			[
				'id' => 'text_k',
				'title' => __('Text', 'project-paradise'),
				'callback' => [$this->handler, 'bio_text_input'],
				'page' => Pages::PAGE,
				'section' => self::SECTIONS['K'],
				'args' => [
					'label_for' => 'text_k',
					'option_name' => self::OPTIONS['NAMES']['K'],
					'value_key' => self::VALUE_KEYS['TEXT'],
				],
			],
		];

		$fields_en = [
			[
				'id' => 'image_us',
				'title' => __('Image', 'project-paradise'),
				'callback' => [$this->handler, 'bio_image_input'],
				'page' => Pages::PAGE_EN,
				'section' => self::SECTIONS['US_EN'],
				'args' => [
					'label_for' => 'image_us',
					'option_name' => self::OPTIONS['NAMES']['US_EN'],
					'value_key' => self::VALUE_KEYS['IMAGE'],
				],
			],
			[
				'id' => 'title_us',
				'title' => __('Title', 'project-paradise'),
				'callback' => [$this->handler, 'bio_title_input'],
				'page' => Pages::PAGE_EN,
				'section' => self::SECTIONS['US_EN'],
				'args' => [
					'label_for' => 'title_us',
					'option_name' => self::OPTIONS['NAMES']['US_EN'],
					'value_key' => self::VALUE_KEYS['TITLE'],
				],
			],
			[
				'id' => 'text_us',
				'title' => __('Text', 'project-paradise'),
				'callback' => [$this->handler, 'bio_text_input'],
				'page' => Pages::PAGE_EN,
				'section' => self::SECTIONS['US_EN'],
				'args' => [
					'label_for' => 'text_us',
					'option_name' => self::OPTIONS['NAMES']['US_EN'],
					'value_key' => self::VALUE_KEYS['TEXT'],
				],
			],
			[
				'id' => 'image_t',
				'title' => __('Image', 'project-paradise'),
				'callback' => [$this->handler, 'bio_image_input'],
				'page' => Pages::PAGE_EN,
				'section' => self::SECTIONS['T_EN'],
				'args' => [
					'label_for' => 'image_t',
					'option_name' => self::OPTIONS['NAMES']['T_EN'],
					'value_key' => self::VALUE_KEYS['IMAGE'],
				],
			],
			[
				'id' => 'title_t',
				'title' => __('Title', 'project-paradise'),
				'callback' => [$this->handler, 'bio_title_input'],
				'page' => Pages::PAGE_EN,
				'section' => self::SECTIONS['T_EN'],
				'args' => [
					'label_for' => 'title_t',
					'option_name' => self::OPTIONS['NAMES']['T_EN'],
					'value_key' => self::VALUE_KEYS['TITLE'],
				],
			],
			[
				'id' => 'text_t',
				'title' => __('Text', 'project-paradise'),
				'callback' => [$this->handler, 'bio_text_input'],
				'page' => Pages::PAGE_EN,
				'section' => self::SECTIONS['T_EN'],
				'args' => [
					'label_for' => 'text_t',
					'option_name' => self::OPTIONS['NAMES']['T_EN'],
					'value_key' => self::VALUE_KEYS['TEXT'],
				],
			],
			[
				'id' => 'image_k',
				'title' => __('Image', 'project-paradise'),
				'callback' => [$this->handler, 'bio_image_input'],
				'page' => Pages::PAGE_EN,
				'section' => self::SECTIONS['K_EN'],
				'args' => [
					'label_for' => 'image_k',
					'option_name' => self::OPTIONS['NAMES']['K_EN'],
					'value_key' => self::VALUE_KEYS['IMAGE'],
				],
			],
			[
				'id' => 'title_k',
				'title' => __('Title', 'project-paradise'),
				'callback' => [$this->handler, 'bio_title_input'],
				'page' => Pages::PAGE_EN,
				'section' => self::SECTIONS['K_EN'],
				'args' => [
					'label_for' => 'title_k',
					'option_name' => self::OPTIONS['NAMES']['K_EN'],
					'value_key' => self::VALUE_KEYS['TITLE'],
				],
			],
			[
				'id' => 'text_k',
				'title' => __('Text', 'project-paradise'),
				'callback' => [$this->handler, 'bio_text_input'],
				'page' => Pages::PAGE_EN,
				'section' => self::SECTIONS['K_EN'],
				'args' => [
					'label_for' => 'text_k',
					'option_name' => self::OPTIONS['NAMES']['K_EN'],
					'value_key' => self::VALUE_KEYS['TEXT'],
				],
			],
		];

		$fields = array_merge($fields, $fields_en);

		foreach ($fields as $field) {
			add_settings_field(...array_values($field));
		}
	}
}
