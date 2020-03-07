<?php

namespace Inc\Admin;

use Inc\Admin\Sidebars\Pages as Sidebars_Pages;
use Inc\Admin\Sidebars\Options as Sidebars_Options;
use Inc\Admin\Bio\Pages as Bio_Pages;

class Admin
{
	private $sidebars_pages;
	private $bio_pages;

	function __construct()
	{
		$this->sidebars_pages = new Sidebars_Pages;
		$this->sidebars_options = new Sidebars_Options;
		$this->bio_pages = new Bio_Pages;

		add_action('admin_menu', [$this, 'create_pages']);
		add_action('admin_init', [$this, 'init_settings']);
	}

	/**
	 * Register all custom pages
	 */
	public function create_pages()
	{
		$this->sidebars_pages->register_page();
		$this->bio_pages->register_page();
	}

	/**
	 * Register all settings, sections and fields
	 */
	public function init_settings()
	{
		$this->sidebars_options->register_settings();
		$this->sidebars_options->register_sections();
		$this->sidebars_options->register_fields();
	}
}
