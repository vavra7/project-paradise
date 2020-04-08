<?php

namespace Inc\Templates;

class Menus_Inputs
{
	/**
	 * Icon input
	 */
	public static function render_icon_input($args = [])
	{
		$p_class = sprintf('field-%s', $args['field_id']);
		$input_id = sprintf('edit-menu-item-%s-%s', $args['field_id'], $args['item_id']);
		$label = $args['label'];
		$input_class = sprintf('edit-menu-item-%s', $args['field_id']);
		$input_name = sprintf('menu-item-%s[%s]', $args['field_id'], $args['item_id']);
		$value = $args['value'];

		?>
			<p class="<?php echo $p_class; ?> description description-wide">
				<label for="<?php echo $input_id; ?>">
					<?php echo $label; ?>
					<input type="text" id="<?php echo $input_id; ?>" class="<?php echo $input_class; ?> widefat code" name="<?php echo $input_name; ?>" value="<?php echo $value; ?>" />
				</label>
			</p>
		<?php
	}
}
