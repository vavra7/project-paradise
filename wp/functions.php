<?php
defined('ABSPATH') || die('What are you doing here? You silly human.');

if (file_exists(dirname(__FILE__) . '/vendor/autoload.php')) {
	require_once dirname(__FILE__) . '/vendor/autoload.php';
}

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load(dirname(__FILE__) . '/.env');

if (class_exists('Inc\\Init')) {
	Inc\init::register_services();
}

function debug($input, $die = false)
{
	echo '<pre>';
	print_r($input);
	echo '</pre>';

	if ($die) die;
}
