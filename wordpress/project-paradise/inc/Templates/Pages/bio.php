<?php
use Inc\Admin_Pages\Modules\Bio\Pages;
use Inc\Admin_Pages\Modules\Bio\Options;
?>

<div class="wrap">
	<h1>Bio</h1>

	<?php settings_errors(); ?>

	<form method="post" action="options.php">
		<?php
		settings_fields(Options::OPTION_GROUP);
		do_settings_sections(Pages::PAGE);
		submit_button();
		?>
	</form>
</div>