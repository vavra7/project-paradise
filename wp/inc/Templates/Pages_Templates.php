<?php

namespace Inc\Templates;

class Pages_Templates
{
	public static function custom_title_input($post)
	{
		$value = get_post_meta($post->ID, '_custom_title', true);
?>
		<input name="_custom_title" type="text" value="<?php echo $value; ?>" class="large-text" /><br>
		<span class="description">Max length: 50</span><br>
<?php
	}
}
