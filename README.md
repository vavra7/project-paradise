# Project Paradise
## Set Up
### Change directory owner for Wordpress (Linux only)
```
sudo chown www-data -R ./wp
```

### Change directory rights (Linux only)
```
sudo chmod 777 -R ./wp
```

### Install composer packages in Wordpress theme
In wp theme folder run:
```
composer install
```

### Install npm packages in Wordpress theme
In wp folder run:
```
npm install
```

### Build scripts and styles for Wordpress in theme folder
In wp folder run: 
```
npm run build
```

### Install Wordpress
on `localhost:8069` go over setup

### Change Wordpress Theme
In Wordpress menu change theme to "Project Paradise"

### Allow authorization headers
Add following lines in Wordpress in .htaccess file under line with: "# END WordPress"
````
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
````

### Import custom wp config file
Add following lines to the bottom of wp-config.php
```
if (file_exists(__DIR__ . '/wp-content/themes/project-paradise/wp-config.extend.php')) {
	require_once __DIR__ . '/wp-content/themes/project-paradise/wp-config.extend.php';
}
```

### Install npm packages in Gatsby
In gatsby folder run:
```
npm install
```

### Launch Wordpress in Wordpress folder
```
docker-compose up
```

## Languages for wordpress (javascript)

### Switch to wp-cli bash
```
docker-compose run --rm wp-cli bash
```

### Create .pot template
In wp-cli bash navigate to project-paradise theme root and then run:
```
wp i18n make-pot ./ ./languages/project-paradise.pot --include="build" --exclude="inc,src"
```

### Create .po file
Copy .pot file and rename it to `${domain}-${locale}.po`

### Add locale and translation
In header of .po file insert locale
```
"Language: ${locale}\n"
```

### Generate JSON
```
wp i18n make-json ./languages/project-paradise-cs_CZ.po --no-purge
```