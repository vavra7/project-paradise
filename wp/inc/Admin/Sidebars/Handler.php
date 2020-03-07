<?php

namespace Inc\Admin\Sidebars;

use Inc\Templates\General_Inputs;

class Handler
{
	private $sidebars_options = [];
	private $general_inputs;

	function __construct()
	{
		add_action('init', [$this, 'get_sidebars_options']);
		$this->general_inputs = new General_Inputs;
	}

	public function get_sidebars_options()
	{
		foreach ($GLOBALS['wp_registered_sidebars'] as $sidebar) {
			$this->sidebars_options[] = [
				'value' => $sidebar['id'],
				'label' => $sidebar['name']
			];
		}
	}

	public function default_sidebar_select($args)
	{
		$new_args = array_merge($args, [
			'options' => $this->sidebars_options,
			'option_name' => sprintf('%s[%s]', $args['option_name'], $args['label_for']),
			'value' => get_option(Options::OPTION_NAME, [])[$args['label_for']],
		]);

		$this->general_inputs->render_select($new_args);
	}
}
