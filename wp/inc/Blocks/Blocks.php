<?php

namespace Inc\Blocks;

use Inc\Setup\Enqueue;

class Blocks extends Enqueue
{
	function __construct()
	{
		add_action('enqueue_block_editor_assets', [$this, 'register_block_scripts']);
		add_action('init', [$this, 'register_block_types']);
	}

	/**
	 * register blocks created in enqueued js file
	 */
	public function register_block_types(): void
	{
		register_block_type('namespace/slug-test', [
			'editor_script' => self::$BLOCK_SCRIPTS
		]);
	}
}
