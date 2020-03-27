<?php

namespace Inc\Setup;

final class Setup
{
	function __construct()
	{
		add_action('after_setup_theme', [$this, 'load_theme_localization']);
		add_action('init', [$this, 'activate_permalink']);
		add_filter('rest_url', [$this, 'change_outgoing_url']);

		add_filter('excerpt_more', [$this, 'new_excerpt_more']);
		remove_filter('the_excerpt', 'wpautop');
	}

	/**
	 * Loading all localization files for theme
	 */
	public function load_theme_localization()
	{
		load_theme_textdomain('project-paradise', get_template_directory() . '/languages');
	}

	/**
	 * Changes outgoing internal REST API requests url.
	 */
	public function change_outgoing_url($url)
	{
		$url = str_replace(home_url(), site_url(), $url);

		return $url;
	}

	/**
	 * If it is not set permalink it sets a permalink structure to avoid plain settings.
	 */
	public function activate_permalink(): void
	{
		$permalink_structure = get_option('permalink_structure');

		if (!$permalink_structure) {
			global $wp_rewrite;

			$wp_rewrite->set_permalink_structure('post/%postname%/');
			update_option("rewrite_rules", false);
			$wp_rewrite->flush_rules(true);
		}
	}

	/**
	 * Replaces 'read more symbol' from excerpt
	 */
	public function new_excerpt_more()
	{
		return '';
	}
}
