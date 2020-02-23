<?php

namespace Inc\Api\Endpoints;

use Inc\Api\Includes\Jwt_Auth;
use \WP_REST_Server;
use \WP_REST_Response;
use \WP_Error;


class Generate_Token_Endpoint
{
	private const ENDPOINT = 'generate-token';

	private $jwt_auth;

	function __construct()
	{
		$this->jwt_auth = new Jwt_Auth;
	}

	/**
	 * Adds new endpoint in REST api
	 */
	public function register_route(): void
	{
		register_rest_route(Endpoints_Enum::NAMESPACE, self::ENDPOINT, [
			'methods' => WP_REST_Server::CREATABLE,
			'callback' => [$this, 'get_response']
		]);
	}

	/**
	 * Gets request response
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

		$data = [
			'token' => $this->jwt_auth->generate_token($user)
		];

		return new WP_REST_Response($data, 200);
	}
}
