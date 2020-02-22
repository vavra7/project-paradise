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
		register_sidebar([
			'name'              => 'Sidebar',
			'id'                => 'sidebar',
			'description'       => 'The website sidebar.',
			'before_widget'     => '<section id="%1$s" class="widget %2$s">',
			'after_widget'      => '</section>',
			'before_title'      => '<div class="widget-title-wrapper"><h3 class="widget-title">',
			'after_title'       => '</h3></div>',
		]);
	}

	/**
	 * Define available widgets
	 */
	public function unregister_widgets()
	{
		if (empty($GLOBALS['wp_widget_factory'])) return;

		$filter_widgets = function ($widget_name) {
			$allowed_widgets = [
				'WP_Widget_Pages'
			];
			return in_array($widget_name, $allowed_widgets);
		};

		$all_widgets = $GLOBALS['wp_widget_factory']->widgets;
		$filtered_widgets = array_filter($all_widgets, $filter_widgets, ARRAY_FILTER_USE_KEY);
		$GLOBALS['wp_widget_factory']->widgets = $filtered_widgets;
	}
}
