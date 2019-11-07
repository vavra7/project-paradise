# project-paradise

## Launch environments (wordpress)

`docker-compose up`

## Change directory owner for Wordpress (Linux only)

`sudo chown www-data -R ./`

## Change directory rights (Linux only)

`sudo chmod 777 -R ./`

## Install composer packages in Wordpress theme

`cd wp-dev && composer install`

## Install Wordpress

wp-dev (localhost:8069) / wp-test (localhost:8068)

## Change Wordpress Theme

In development environment wp-dev change theme to "Project Paradise"

## Enable Wordpress API routes

Change permalinks to "Post name" in Settings -> Permalinks

## Install npm packages in Gatsby (gatsby)

`npm install`
