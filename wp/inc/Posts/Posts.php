<?php

namespace Inc\Posts;

class Posts
{
	function __construct()
	{
		$this->add_filters();
	}

	private function add_filters(): void
	{
		add_filter('tag_link', [$this, 'new_tag_link']);
	}

	/**
	 * Inserts '/app' in path of tag link
	 */
	public function new_tag_link($tag_link): string
	{
		$home_url = get_home_url();
		$path = rtrim(parse_url($tag_link, PHP_URL_PATH), '/');
		$new_tag_ling = sprintf('%s/app%s', $home_url, $path);

		return $new_tag_ling;
	}
}
