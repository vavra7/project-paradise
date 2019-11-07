# project-paradise

## Launch environments (wordpress)

`docker-compose up`

## Change directory owner for Wordpress (Linux only)

`sudo chown www-data -R ./wp`

## Change directory rights (Linux only)

`sudo chmod 777 -R ./wp`

## Install composer packages in Wordpress theme

`cd wp && composer install`

## Install Wordpress

wp (localhost:8069)

## Change Wordpress Theme

In development environment wp change theme to "Project Paradise"

## Enable Wordpress API routes

Change permalinks to "Post name" in Settings -> Permalinks

## Install npm packages in Gatsby (gatsby)

`npm install`
