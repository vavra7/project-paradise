<?php

namespace Inc\Sidebars\Widgets;

use \WP_Widget;
use Inc\Admin_Pages\Pages\Bio\Pages as Bio_Pages;
use Inc\Admin_Pages\Pages\Bio\Options as Bio_Options;
use Inc\Templates\General_Parts;
use Inc\Templates\General_Inputs;

class Bio_Widget extends WP_Widget
{
	const PARAMS = [
		'DEFAULT_BIO' => 'default_bio'
	];

	public $widget_ID;
	public $widget_name;
	public $widget_options = [];
	public $control_options = [];
	private $bio_options;

	public function __construct()
	{
		$this->bio_options = new Bio_Options();
		$this->widget_ID = 'bio';
		$this->widget_name = 'Bio';
		$this->widget_options = [
			'classname' => $this->widget_ID,
			'description' => __('Widget about author', 'project-paradise'),
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
		$options = array_map(
			function ($item) {
				$item['value'] = $item['id'];
				unset($item['id']);

				return $item;
			},
			$this->bio_options->get_bio_options()
		);

		$options = array_merge([General_Parts::get_empty_option()], $options);

		$args = [
			'option_name' => $this->get_field_name(self::PARAMS['DEFAULT_BIO']),
			'id' => $this->get_field_id(self::PARAMS['DEFAULT_BIO']),
			'class' => 'widefat',
			'options' => $options,
			'value' => $instance[self::PARAMS['DEFAULT_BIO']] ?? ''
		]

?>
		<p>
			<label for="<?php echo $args['id'] ?>">
				<?php _e('Default Bio', 'project-paradise') ?>:
			</label>

			<?php General_Inputs::render_select($args); ?>

			<span class="description" id="<?php printf('%s-description', $args['id']); ?>">
				<?php _e('Edit bio on', 'project-paradise'); ?> <a href="<?php printf('%sthemes.php?page=%s', get_admin_url(), Bio_Pages::PAGE); ?>">
					<?php _e('Bio page', 'project-paradise'); ?>
				</a>
			</span>
		</p>
<?php
	}

	/**
	 * Runs on Widget save
	 */
	public function update($new_instance, $old_instance)
	{
		$instance = $old_instance;
		$instance[self::PARAMS['DEFAULT_BIO']] = $new_instance[self::PARAMS['DEFAULT_BIO']];

		return $instance;
	}
}
