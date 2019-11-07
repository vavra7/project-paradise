<?php
if (file_exists(dirname(__FILE__) . '/vendor/autoload.php')) {
	require_once dirname(__FILE__) . '/vendor/autoload.php';
}

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
