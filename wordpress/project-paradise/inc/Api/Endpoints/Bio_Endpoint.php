<?php

namespace Inc\Api\Endpoints;

use \WP_REST_Server;
use \WP_REST_Response;
use Inc\Admin_Pages\Pages\Bio\Options as Bio_Options;
use Inc\Helper_Trait;

class Bio_Endpoint extends Endpoints
{
	use Helper_Trait;

	private const ENDPOINT = 'bio';

	private $bio_options;

	function __construct()
	{
		$this->bio_options = new Bio_Options();
	}

	/**
	 * Adds new endpoint in REST api
	 */
	public function register_route(): void
	{
		register_rest_route(self::NAMESPACE, self::ENDPOINT, [
			'methods' => WP_REST_Server::READABLE,
			'callback' => [$this, 'get_bio_data']
		]);
	}

	/**
	 * Returns data for endpoint
	 */
	public function get_bio_data(): WP_REST_Response
	{
		$bio_data = array_map(
			function ($item) {
				foreach (Bio_Options::VALUE_KEYS as $key => $value_key) {
					if ($value_key === Bio_Options::VALUE_KEYS['IMAGE']) {
						$item[$value_key] = $this->get_array_option($item['id'], $value_key, 0);
					} else {
						$item[$value_key] = $this->get_array_option($item['id'], $value_key, '');
					}
				}

				return $item;
			},
			$this->bio_options->get_bio_options()
		);

		return new WP_REST_Response($bio_data, 200);
	}
}
