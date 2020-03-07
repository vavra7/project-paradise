<?php

namespace Inc\Templates;

class General_Inputs
{
	public static function render_select($args = [])
	{
		$option_name = $args['option_name'] ?? '';
		$id = $args['label_for'] ?? '';
		$options = $args['options'];
		$value = $args['value'];
?>
		<select name="<?php echo $option_name; ?>" id="<?php echo $id; ?>" class="">
			<?php
			foreach ($options as $option) {
				if ($option['value'] === $value) {
					printf('<option selected="selected" value="%s">%s</option>', $option['value'], $option['label']);
				} else {
					printf('<option value="%s">%s</option>', $option['value'], $option['label']);
				}
			}
			?>
		</select>
<?php
	}
}
