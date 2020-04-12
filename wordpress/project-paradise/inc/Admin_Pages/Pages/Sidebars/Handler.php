<?php

namespace Inc\Admin_Pages\Pages\Sidebars;

use Inc\Templates\General_Inputs;
use Inc\Admin_Pages\Includes\Helper;

class Handler
{
	private $helper;
	private $sidebars_options = [];

	function __construct()
	{
		$this->helper = new Helper;
		add_action('init', [$this, 'get_sidebars_options']);
	}

	/**
	 * Gets all available sidebar for select box options
	 */
	public function get_sidebars_options()
	{
		foreach ($GLOBALS['wp_registered_sidebars'] as $sidebar) {
			$this->sidebars_options[] = [
				'value' => $sidebar['id'],
				'label' => $sidebar['name']
			];
		}
	}

	/**
	 * Gets inputs
	 */
	public function default_sidebar_select($args)
	{
		$new_args = array_merge($args, [
			'options' => $this->sidebars_options,
			'option_name' => sprintf('%s[%s]', $args['option_name'], $args['label_for']),
			'value' => $this->helper->get_array_option(Options::OPTION_NAME, $args['label_for']),
		]);

		General_Inputs::render_select($new_args);
	}
}
