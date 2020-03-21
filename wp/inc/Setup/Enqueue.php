<?php

namespace Inc\Setup;

class Enqueue
{
	const ADMIN_STYLE = 'admin-style';
	const WP_STYLE = 'wp-style';
	const ADMIN_SCRIPT = 'admin-script';
	const GUTENBERG_SCRIPT = 'gutenberg-script';

	function __construct()
	{
		add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_style']);
		add_action('wp_enqueue_scripts', [$this, 'enqueue_wp_style']);
		add_action('enqueue_block_editor_assets', [$this, 'register_gutenberg_scripts']);
		add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_script']);
	}

	/**
	 * Enqueueing styles in admin section
	 */
	public function enqueue_admin_style(): void
	{
		if (file_exists(get_template_directory() . '/build/adminStyle.asset.php')) {
			$asset_file = include(get_template_directory() . '/build/adminStyle.asset.php');

			wp_enqueue_style(
				self::ADMIN_STYLE,
				get_template_directory_uri() . '/build/adminStyle.css',
				[],
				$asset_file['version'],
				'all'
			);
		}
	}

	/**
	 * Enqueueing main wp styles
	 */
	public function enqueue_wp_style(): void
	{
		if (file_exists(get_template_directory() . '/build/wpStyle.asset.php')) {
			$asset_file = include(get_template_directory() . '/build/wpStyle.asset.php');

			wp_enqueue_style(
				self::WP_STYLE,
				get_template_directory_uri() . '/build/wpStyle.css',
				[],
				$asset_file['version'],
				'all'
			);
		}
	}

	/**
	 * Register gutenberg scripts
	 */
	public function register_gutenberg_scripts(): void
	{
		if (file_exists(get_template_directory() . '/build/gutenberg.asset.php')) {
			$asset_file = include(get_template_directory() . '/build/gutenberg.asset.php');

			wp_register_script(
				self::GUTENBERG_SCRIPT,
				get_template_directory_uri() . '/build/gutenberg.js',
				$asset_file['dependencies'],
				$asset_file['version']
			);
		}
	}

	/**
	 * Enqueueing admin scripts
	 */
	public function enqueue_admin_script(): void
	{
		if (file_exists(get_template_directory() . '/build/adminScript.asset.php')) {
			$asset_file = include(get_template_directory() . '/build/adminScript.asset.php');

			wp_enqueue_media();

			wp_enqueue_script(
				self::ADMIN_SCRIPT,
				get_template_directory_uri() . '/build/adminScript.js',
				['jquery'],
				$asset_file['version'],
				true
			);
		}
	}
}
