<?php

namespace Inc\Api\Routes;

use \WP_REST_Server;
use \WP_Error;
use Firebase\JWT\JWT;

class Generate_Token_Route
{
	private const ROUTE = 'generate-token';

	function __construct()
	{
		add_action('rest_api_init', [$this, 'register_route']);
	}

	/**
	 * Adds new endpoint in REST api
	 */
	public function register_route(): void
	{
		register_rest_route(Routes_Enum::NAMESPACE, self::ROUTE, [
			'methods' => WP_REST_Server::CREATABLE,
			'callback' => [$this, 'get_response']
		]);
	}

	/**
	 * Returns response for request
	 */
	public function get_response($request)
	{
		$username = $request->get_param('username');
		$password = $request->get_param('password');

		$user = wp_authenticate($username, $password);

		if (is_wp_error($user)) {
			$error_code = $user->get_error_code();
			$new_error = new WP_Error(
				$error_code,
				'Can not generate token.',
				array(
					'status' => 403,
				)
			);

			return $new_error;
		}


		return [
			'token' => $this->generate_token($user)
		];
	}

	/**
	 * Generates and returns JWT token
	 */
	public function generate_token($user)
	{
		$payload = [
			'iss' => get_bloginfo('url'),
			'exp' => time() + 30,
			'data' => [
				'user' => [
					'id' => $user->data->ID
				]
			]
		];

		return JWT::encode($payload, getenv('JWT_SECRET_KEY'));
	}
}
