<?php

namespace Inc\Templates;

class General_Inputs
{
	/**
	 * General text input
	 */
	public static function render_text_input($args = [])
	{
		$id = $args['id'] ?? '';
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
		$id = $args['id'] ?? '';
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
		$id = $args['id'] ?? '';
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
		$id = $args['id'] ?? '';
		$value = $args['value'] ?? '';
		$class = $args['class'] ?? '';
		$default_src = $args['default_src'] ?? '';

		if ($value && wp_get_attachment_image_src($value)) {
			$src = wp_get_attachment_image_src($value)[0];
		} else {
			$src = $default_src;
		}

	?>
		<div class="d-flex">
			<img id="<?php echo $id; ?>" src="<?php echo $src; ?>" class="avatar avatar-96 photo link" height="96" width="96">
			<div class="ml-3 d-flex fd-column" style="align-self: flex-end;">
				<input id="<?php echo $id; ?>" name="<?php echo $option_name; ?>" type="hidden" value="<?php echo $value; ?>" class="<?php echo $class; ?>" />
				<button id="<?php echo $id; ?>" class="button button-secondary" type="button">Select Image</button>
				<a id="<?php echo $id; ?>" class="link-destructive mt-1" href="#">Remove Image</a>
			</div>
		</div>
<?php
	}
}
