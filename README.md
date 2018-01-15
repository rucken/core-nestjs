## rucken-core-nestjs
[![Greenkeeper badge](https://badges.greenkeeper.io/rucken/core-nestjs.svg)](https://greenkeeper.io/)
[![Build Status][travis-image]][travis-url]
[![dependencies-release][dependencies-image]][dependencies-url]


A simple application demonstrating the basic usage of permissions with [NestJS](https://nestjs.com).

## Usage
- clone or fork [repository](https://github.com/rucken/core-nestjs.git) `git clone --recursive https://github.com/rucken/core-nestjs.git`
- make sure you have [node.js](https://nodejs.org/) installed version 6+
- make sure you have NPM installed version 3+
- run `npm install` to install project dependencies
- copy `_env` to `.env` and set environments for use
- run `npm run schema:sync` to create all tables in database 
- run `npm run migrate:run` to run all migrations
- run `npm run start:prod` to fire up prod server (`npm run start:watch` - dev server)
- Open browser to [`http://localhost:3000`](http://localhost:3000)

## Demo application on [Heroku](https://rucken-core-nestjs.herokuapp.com)

### Users
- user with admin group: admin@admin.com, password: 12345678
- user with user group: user1@user1.com, password: 12345678
- user with user group: user2@user2.com, password: 12345678

### Swagger
- local: http://localhost:3000/swagger
- online: https://rucken-core-nestjs.herokuapp.com/swagger

- apiKey template: ```JWT <token_generated_on_login>```


## License

MIT

[travis-image]: https://travis-ci.org/rucken/core-nestjs.svg?branch=master
[travis-url]: https://travis-ci.org/rucken/core-nestjs
[dependencies-image]: https://david-dm.org/rucken/core-nestjs/status.svg
[dependencies-url]: https://david-dm.org/rucken/core-nestjs
