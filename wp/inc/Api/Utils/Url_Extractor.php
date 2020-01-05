<?php

namespace Inc\Api\Utils;

trait Url_Extractor
{
	public function get_path_from_url(string $url): string
	{
		return rtrim(parse_url($url, PHP_URL_PATH), '/');
	}
}
