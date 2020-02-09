<?php

namespace Inc\Blocks;

use Inc\Setup\Enqueue;

class Blocks extends Enqueue
{
	function __construct()
	{
		add_action('init', [$this, 'register_block_types']);
		add_action('init', [$this, 'setup_blocks']);
	}

	/**
	 * register all blocks created in enqueued js file
	 */
	public function register_block_types(): void
	{
		register_block_type('gatsby/all-custom-blocks', [
			'editor_script' => self::BLOCK_SCRIPTS
		]);
	}

	// TODO: zkontrolovat funkcionalitu, aktuálně nefuguje a má být opraveno ve verzi wordpressu 5.4
	// https://developer.wordpress.org/block-editor/developers/themes/theme-support/#responsive-embedded-content
	/**
	 * general blocks setup
	 */
	public function setup_blocks(): void
	{
		add_theme_support('responsive-embeds');
	}
}
