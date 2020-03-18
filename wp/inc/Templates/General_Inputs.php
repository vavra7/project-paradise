<?php

namespace Inc\Templates;

class General_Inputs
{
	/**
	 * General text input
	 */
	public static function render_text_input($args = [])
	{
		$id = $args['label_for'] ?? '';
		$option_name = $args['option_name'] ?? '';
		$value = $args['value'] ?? '';
		$class = $args['class'] ?? '';

?>
		<input id="<?php echo $id; ?>" name="<?php echo $option_name; ?>" type="text" value="<?php echo $value; ?>" class="<?php echo $class; ?>">
	<?php
	}

	/**
	 * General text area
	 */
	public static function render_text_area($args = [])
	{
		$id = $args['label_for'] ?? '';
		$option_name = $args['option_name'] ?? '';
		$value = $args['value'] ?? '';
		$class = $args['class'] ?? '';
		$rows = $args['rows'] ?? 3;

	?>
		<textarea id="<?php echo $id; ?>" name="<?php echo $option_name; ?>" rows="<?php echo $rows; ?>" class="<?php echo $class; ?>"><?php echo $value; ?></textarea>
	<?php
	}

	/**
	 * General select box
	 */
	public static function render_select($args = [])
	{
		$option_name = $args['option_name'] ?? '';
		$id = $args['label_for'] ?? '';
		$options = $args['options'] ?? '';
		$value = $args['value'] ?? '';
		$class = $args['class'] ?? '';

	?>
		<select name="<?php echo $option_name; ?>" id="<?php echo $id; ?>" class="<?php echo $class; ?>">
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

	/**
	 * General image
	 */
	public static function render_img($args = [])
	{
		$option_name = $args['option_name'] ?? '';
		$id = $args['label_for'] ?? '';
		$options = $args['options'] ?? '';
		$value = $args['value'] ?? '';
		$class = $args['class'] ?? '';

		$image_id = 36;

	?>
		<img alt="" src="http://0.gravatar.com/avatar/62a9fc77b58226b8af523bc42df50448?s=96&amp;d=mm&amp;r=g" srcset="http://0.gravatar.com/avatar/62a9fc77b58226b8af523bc42df50448?s=192&amp;d=mm&amp;r=g 2x" class="avatar avatar-96 photo" height="96" width="96">
		<input type="hidden" name="myprefix_image_id" id="myprefix_image_id" value="<?php echo esc_attr( $image_id ); ?>" class="regular-text" />
 <input type='button' class="button-primary" value="<?php esc_attr_e( 'Select a image', 'mytextdomain' ); ?>" id="myprefix_media_manager"/>
</p>
<?php
	}
}
