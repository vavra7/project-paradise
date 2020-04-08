<?php
use Inc\Admin_Pages\Modules\Sidebars\Pages;
use Inc\Admin_Pages\Modules\Sidebars\Options;
?>

<div class="wrap">
	<h1>Sidebars</h1>

	<?php settings_errors(); ?>

	<form method="post" action="options.php">
		<?php
		settings_fields(Options::OPTION_GROUP);
		do_settings_sections(Pages::PAGE);
		submit_button();
		?>
	</form>
</div>