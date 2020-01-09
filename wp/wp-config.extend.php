<?php
if (wp_get_theme() != 'Project Paradise') return;

if (file_exists(dirname(__FILE__) . '/vendor/autoload.php')) {
	require_once dirname(__FILE__) . '/vendor/autoload.php';
	$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
	$dotenv->load();
}

define('WP_SITEURL', getenv('WP_SITEURL'));
define('WP_HOME', getenv('WP_HOME'));
