# project-paradise

## Change directory owner for Wordpress (Linux only)

`sudo chown www-data -R ./wp`

## Change directory rights (Linux only)

`sudo chmod 777 -R ./wp`

## Install composer packages in Wordpress theme

In wp folder run: `composer install`

## Install npm packages in Wordpress

In wp folder run: `npm install`

## Build scripts and styles for Wordpress

In wp folder run: `npm run build`

## Install Wordpress

on localhost:8069 go through setup

## Allow authorization headers
Add following lines in Wordpress in .htaccess file under line with: "# END WordPress"
````
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
````

## Change Wordpress Theme

In Wordpress menu change theme to "Project Paradise"

## Enable Wordpress API routes

Change permalinks to "Post name" in Settings -> Permalinks

## Install npm packages in Gatsby

In gatsby folder run: `npm install`

## Launch environments (wordpress)

`docker-compose up`
