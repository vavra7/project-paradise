<?php

namespace Inc\Rest_Api;

use Inc\Rest_Api\Endpoints\Generate_Token_Endpoint;
use Inc\Rest_Api\Endpoints\Menus_Endpoint;
use Inc\Rest_Api\Endpoints\Posts_Endpoint;
use Inc\Rest_Api\Endpoints\Pages_Endpoint;
use Inc\Rest_Api\Endpoints\Categories_Endpoint;
use Inc\Rest_Api\Endpoints\Settings_Endpoint;
use Inc\Rest_Api\Includes\Jwt_Auth;

class Rest_Api
{
	private $jwt_auth;

	private $posts_endpoint;

	private $pages_endpoint;

	private $menus_endpoint;

	private $categories_endpoint;

	private $generate_token_endpoint;

	private $settings_endpoint;

	function __construct()
	{
		$this->jwt_auth = new Jwt_Auth;
		$this->posts_endpoint = new Posts_Endpoint;
		$this->pages_endpoint = new Pages_Endpoint;
		$this->menus_endpoint = new Menus_Endpoint;
		$this->categories_endpoint = new Categories_Endpoint;
		$this->settings_endpoint = new Settings_Endpoint;
		$this->generate_token_endpoint = new Generate_Token_Endpoint;

		$this->add_actions();
		$this->add_filters();
	}

	private function add_actions(): void
	{
		add_action('rest_api_init', [$this, 'on_rest_api_init']);
	}

	private function add_filters(): void
	{
		add_filter('determine_current_user', [$this->jwt_auth, 'determine_current_user']);
		add_filter('rest_pre_dispatch', [$this->jwt_auth, 'return_jwt_error']);
		add_filter('rest_pre_echo_response', [$this->settings_endpoint, 'add_field_show_on_front']);
	}

	public function on_rest_api_init(): void
	{
		$this->menus_endpoint->register_route();
		$this->generate_token_endpoint->register_route();

		$this->posts_endpoint->add_field_blocks();
		$this->posts_endpoint->add_field_path();
		$this->pages_endpoint->add_field_states();
		$this->pages_endpoint->add_field_path();
		$this->categories_endpoint->add_field_path();
	}
}
