<?php
if (function_exists('wp_get_theme')) {
	if (wp_get_theme() != 'Project Paradise') return;
} else {
	return;
}

if (file_exists(dirname(__FILE__) . '/vendor/autoload.php')) {
	require_once dirname(__FILE__) . '/vendor/autoload.php';
	$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
	$dotenv->load(dirname(__FILE__) . '/.env');
}

define('WP_SITEURL', $_ENV['WP_SITEURL']);
define('WP_HOME', $_ENV['WP_HOME']);
