<?php

namespace Inc\Api\Endpoints;

use \WP_REST_Server;
use \WP_REST_Response;
use Inc\Admin\Sidebars\Options as Sidebars_Options;

class Sidebars_Endpoint
{
	private const ENDPOINT = 'sidebars';
	private $sidebars_options;

	function __construct()
	{
		$this->sidebars_options = new Sidebars_Options;
	}

	/**
	 * Register route
	 */
	public function register_route(): void
	{
		register_rest_route(Endpoints_Enum::NAMESPACE, self::ENDPOINT, [
			'methods' => WP_REST_Server::READABLE,
			'callback' => [$this, 'get_sidebars']
		]);
	}

	/**
	 * Generates response
	 */
	public function get_sidebars(): WP_REST_Response
	{
		$callback = function ($key, $value) {
			return [
				'id' => $value['id'],
				'name' => $value['name'],
				'description' => $value['description'],
				'widgets' => $this->get_sidebar_widgets($value['id'])
			];
		};

		$data = [
			'default_sidebars' => get_option($this->sidebars_options::OPTION_NAME, json_decode('{}')),
			'sidebar_list' => array_map(
				$callback,
				array_keys($GLOBALS['wp_registered_sidebars']),
				array_values($GLOBALS['wp_registered_sidebars'])
			)
		];

		return new WP_REST_Response($data, 200);
	}

	/**
	 * Get all sidebar widgets for response
	 */
	public function get_sidebar_widgets($sidebar_id)
	{
		$callback = function ($key, $value) {
			global $wp_registered_widgets;

			$widget = $wp_registered_widgets[$value];
			$option_name = $widget['callback'][0]->option_name;
			$param_number = $widget['params'][0]['number'];

			return [
				'id' => $widget['id'],
				'id_base' => $widget['callback'][0]->id_base,
				'name' => $widget['name'],
				'params' => $this->get_widget_params($option_name, $param_number)
			];
		};

		$widgets = wp_get_sidebars_widgets()[$sidebar_id];
		$widgets = array_map(
			$callback,
			array_keys($widgets),
			array_values($widgets)
		);

		return $widgets;
	}

	/**
	 * Get all params for widget
	 */
	public function get_widget_params($option_name, $param_number)
	{
		$widget_params = get_option($option_name)[$param_number];

		return $widget_params;
	}
}
