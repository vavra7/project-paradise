<?php

namespace Inc\Sidebars\Widgets;

use \WP_Widget;

class Bio_Widget extends WP_Widget
{
	public $widget_ID;
	public $widget_name;
	public $widget_options = [];
	public $control_options = [];

	public function __construct()
	{
		$this->widget_ID = 'bio';
		$this->widget_name = 'Bio';
		$this->widget_options = [
			'classname' => $this->widget_ID,
			'description' => 'Widget about author',
			'customize_selective_refresh'	=> true
		];
		$this->control_options = [];
	}

	/**
	 * Register this widget
	 */
	public function register()
	{
		parent::__construct(
			$this->widget_ID,
			$this->widget_name,
			$this->widget_options,
			$this->control_options
		);

		register_widget($this);
	}

	/**
	 * Generates front end mark up
	 */
	public function widget($args, $instance)
	{
		echo $args['before_widget'];
		echo $args['after_widget'];
	}

	/**
	 * Generates admin mark up
	 */
	public function form($instance)
	{
		$title = $instance['title'] ?? '';

?>
		<p>
			<label for="<?php echo $this->get_field_id('title'); ?>">Title:</label>
			<input 
				type="text"
				class="widefat"
				id="<?php echo $this->get_field_id('title'); ?>"
				name="<?php echo $this->get_field_name('title'); ?>"
				value="<?php echo $title; ?>"
			>
		</p>
<?php
	}

	/**
	 * Runs on Widget save
	 */
	public function update($new_instance, $old_instance)
	{
		$instance = $old_instance;
		$instance['title'] = sanitize_text_field($new_instance['title']);

		return $instance;
	}
}
