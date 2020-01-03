<?php

namespace Inc\Setup;

class Enqueue
{
	const ADMIN_STYLE = 'admin-style';
	const MAIN_STYLE = 'main-style';
	const BLOCK_SCRIPTS = 'block-scripts';

	function __construct()
	{
		add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_style']);
		add_action('wp_enqueue_scripts', [$this, 'enqueue_main_style']);
	}

	/**
	 * Enqueueing styles in admin section
	 */
	public function enqueue_admin_style(): void
	{
		if (file_exists(get_template_directory() . '/build/admin.asset.php')) {
			$asset_file = include(get_template_directory() . '/build/admin.asset.php');

			wp_enqueue_style(
				self::ADMIN_STYLE,
				get_template_directory_uri() . '/build/admin.css',
				[],
				$asset_file['version'],
				'all'
			);
		}
	}

	/**
	 * Enqueueing main wp styles
	 */
	public function enqueue_main_style(): void
	{
		if (file_exists(get_template_directory() . '/build/style.asset.php')) {
			$asset_file = include(get_template_directory() . '/build/style.asset.php');

			wp_enqueue_style(
				self::MAIN_STYLE,
				get_template_directory_uri() . '/build/style.css',
				[],
				$asset_file['version'],
				'all'
			);
		}
	}

	/**
	 * Enqueueing block scripts
	 */
	public function register_block_scripts(): void
	{
		if (file_exists(get_template_directory() . '/build/index.asset.php')) {
			$asset_file = include(get_template_directory() . '/build/index.asset.php');

			wp_register_script(
				self::BLOCK_SCRIPTS,
				get_template_directory_uri() . '/build/index.js',
				$asset_file['dependencies'],
				$asset_file['version']
			);
		}
	}
}
