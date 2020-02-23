<?php

namespace Inc\Sidebars;

use Inc\Sidebars\Widgets\Bio_Widget;

class Sidebars
{
	private $bio_widget;

	function __construct()
	{
		$this->bio_widget = new Bio_Widget;

		add_action('widgets_init', [$this, 'register_sidebars']);
		add_action('widgets_init', [$this, 'register_custom_widgets']);
		add_action('widgets_init', [$this, 'unregister_widgets'], 99);
	}

	/**
	 * Register sidebar
	 */
	public function register_sidebars()
	{
		$sidebars = [
			[
				'name' => 'Sidebar',
				'id' => 'sidebar',
				'description' => 'The website sidebar.',
			],
			[
				'name' => 'Sidebar2',
				'id' => 'sidebar2',
				'description' => 'The website sidebar.',
			]
		];

		foreach ($sidebars as $sidebar) {
			register_sidebar($sidebar);
		}
	}

	public function register_custom_widgets()
	{
		$this->bio_widget->register();
	}

	/**
	 * Define available widgets
	 */
	public function unregister_widgets()
	{
		if (empty($GLOBALS['wp_widget_factory'])) return;

		$callback = function ($widget) {
			$allowed_widgets = [
				'bio',
				'recent-posts'
			];
			return in_array($widget->id_base, $allowed_widgets);
		};

		$widgets = array_filter(
			$GLOBALS['wp_widget_factory']->widgets,
			$callback
		);
		$GLOBALS['wp_widget_factory']->widgets = $widgets;
	}
}
