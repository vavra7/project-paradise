<?php

namespace Inc\Admin_Pages;

use Inc\Admin_Pages\Modules\Sidebars\Pages as Sidebars_Pages;
use Inc\Admin_Pages\Modules\Sidebars\Options as Sidebars_Options;
use Inc\Admin_Pages\Modules\Bio\Pages as Bio_Pages;
use Inc\Admin_Pages\Modules\Bio\Options as Bio_Options;

class Admin_Pages
{
	private $sidebars_pages;
	private $sidebars_options;
	private $bio_pages;
	private $bio_options;

	function __construct()
	{
		$this->sidebars_pages = new Sidebars_Pages;
		$this->sidebars_options = new Sidebars_Options;
		$this->bio_pages = new Bio_Pages;
		$this->bio_options = new Bio_Options;

		add_action('admin_menu', [$this, 'create_pages']);
		add_action('admin_init', [$this, 'init_settings']);
	}

	/**
	 * Register all custom pages
	 */
	public function create_pages()
	{
		$this->sidebars_pages->register_pages();
		$this->bio_pages->register_pages();
	}

	/**
	 * Register all settings, sections and fields
	 */
	public function init_settings()
	{
		$this->sidebars_options->register_settings();
		$this->sidebars_options->register_sections();
		$this->sidebars_options->register_fields();

		$this->bio_options->register_settings();
		$this->bio_options->register_sections();
		$this->bio_options->register_fields();
	}
}
