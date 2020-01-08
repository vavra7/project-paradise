<?php

namespace Inc\Rest_Api\Includes;

use \WP_Error;
use \Exception;
use Firebase\JWT\JWT;

class Jwt_Auth
{
	private $jwt_error;

	/**
	 * The default filters used to determine the current user from the request’s cookies.
	 * Not only REST API requests.
	 */
	public function determine_current_user($user)
	{
		if (!$this->is_rest_api_request()) {
			return $user;
		}

		if ($_SERVER['HTTP_AUTHORIZATION']) {
			$auth_header = $_SERVER['HTTP_AUTHORIZATION'];
		} else if ($_SERVER['REDIRECT_HTTP_AUTHORIZATION']) {
			$auth_header = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
		} else {
			return $user;
		}

		$decoded_token = $this->validate_token($auth_header);

		if (!$decoded_token) {
			return $user;
		}

		return $decoded_token->data->user->id;
	}

	/**
	 * Check if there is saved error from JWT token validation.
	 * If so, return error instead.
	 */
	public function return_jwt_error($request)
	{
		if (is_wp_error($this->jwt_error)) {
			return $this->jwt_error;
		}

		return $request;
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

	/**
	 * Function validating token. In case success validation returns
	 * decoded token. Otherwise false.
	 */
	private function validate_token($auth_header)
	{
		list($encoded_token) = sscanf($auth_header, 'Bearer %s');

		if (!$encoded_token) {
			$this->jwt_error = new WP_Error(
				'jwt_auth_bad_auth_header',
				'Authorization header malformed.',
				array(
					'status' => 403,
				)
			);

			return false;
		}

		try {
			$decoded_token = JWT::decode($encoded_token, getenv('JWT_SECRET_KEY'), array('HS256'));

			if ($decoded_token->iss != get_bloginfo('url')) {
				$this->jwt_error = new WP_Error(
					'jwt_auth_bad_iss',
					'The iss do not match with this server',
					array(
						'status' => 403,
					)
				);

				return false;
			}

			if (!isset($decoded_token->data->user->id)) {
				$this->jwt_error = new WP_Error(
					'jwt_auth_bad_request',
					'User ID not found in the token',
					array(
						'status' => 403,
					)
				);

				return false;
			}
		} catch (Exception $e) {
			$this->jwt_error = new WP_Error(
				'jwt_auth_invalid_token',
				$e->getMessage(),
				array(
					'status' => 403,
				)
			);

			return false;
		}

		return $decoded_token;
	}

	/**
	 * Determine if it is rest api request
	 */
	private function is_rest_api_request()
	{
		$rest_api_slug = rest_get_url_prefix();
		$valid_api_uri = strpos($_SERVER['REQUEST_URI'], $rest_api_slug);

		return $valid_api_uri;
	}
}
