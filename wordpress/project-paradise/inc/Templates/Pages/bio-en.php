<?php

use Inc\Admin_Pages\Modules\Bio\Pages;
use Inc\Admin_Pages\Modules\Bio\Options;
?>

<div class="wrap">
	<h1>Bio</h1>

	<hr class="wp-header-end">

	<nav class="nav-tab-wrapper wp-clearfix">
		<a href="<?php printf('%sthemes.php?page=%s', get_admin_url(), Pages::PAGE); ?>" class="nav-tab">
			<?php _e('cz', 'project-paradise') ?>
		</a>
		<a href="<?php printf('%sthemes.php?page=%s', get_admin_url(), Pages::PAGE_EN); ?>" class="nav-tab nav-tab-active">
			<?php _e('en', 'project-paradise') ?>
		</a>
	</nav>

	<?php settings_errors(); ?>

	<form method="post" action="options.php">
		<?php
		settings_fields(Options::OPTION_GROUP_EN);
		do_settings_sections(Pages::PAGE_EN);
		submit_button();
		?>
	</form>
</div>