<?php

namespace Inc\Sidebars;

class Sidebars
{
	function __construct()
	{
		add_action('widgets_init', [$this, 'register_sidebars']);
		add_action('widgets_init', [$this, 'unregister_widgets']);
	}

	/**
	 * Register sidebar
	 */
	public function register_sidebars()
	{
		$sidebars = [
			[
				'name'              => 'Sidebar',
				'id'                => 'sidebar',
				'description'       => 'The website sidebar.',
			],
			[
				'name'              => 'Sidebar2',
				'id'                => 'sidebar2',
				'description'       => 'The website sidebar.',
			]
		];

		foreach ($sidebars as $sidebar) {
			register_sidebar($sidebar);
		}
	}

	/**
	 * Define available widgets
	 */
	public function unregister_widgets()
	{
		if (empty($GLOBALS['wp_widget_factory'])) return;

		$callback = function ($widget_name) {
			$allowed_widgets = [
				'WP_Widget_Recent_Posts'
			];
			return in_array($widget_name, $allowed_widgets);
		};

		$all_widgets = $GLOBALS['wp_widget_factory']->widgets;
		$filtered_widgets = array_filter($all_widgets, $callback, ARRAY_FILTER_USE_KEY);
		$GLOBALS['wp_widget_factory']->widgets = $filtered_widgets;
	}
}
