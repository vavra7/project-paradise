<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Test</title>
	<?php wp_head(); ?>
</head>

<body>
	<?php
	function debug($input): void
	{
		echo '<pre>';
		print_r($input);
		echo '</pre>';
	}

	debug(parse_url('https://www.youtube.com/watch?v=oAVhEPey_qA&t=11906s'));

	?>

</body>

<?php wp_footer() ?>

</html>