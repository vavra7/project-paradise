<?php

namespace Inc\Templates;

class Menu_Templates
{
	public static function menu_item_input_description_wide($input_id, $item_id, $label, $value, $args)
	{
?>
		<p class="field-<?php echo $input_id; ?> description description-wide">
			<label for="edit-menu-item-<?php echo $input_id . '-' . $item_id; ?>">
				<?php echo $label; ?><br />
				<input type="text" id="edit-menu-item-<?php echo $input_id  . '-' . $item_id; ?>" class="widefat <?php echo $args['code'] ? 'code' : '' ?> edit-menu-item-<?php echo $input_id; ?>" name="menu-item-<?php echo $input_id; ?>[<?php echo $item_id; ?>]" value="<?php echo esc_attr($value); ?>" />
			</label>
		</p>
<?php
	}
}
