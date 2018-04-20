# rucken-core-nestjs

[![Greenkeeper badge](https://badges.greenkeeper.io/rucken/core-nestjs.svg)](https://greenkeeper.io/)
[![Build Status][travis-image]][travis-url]
[![dependencies-release][dependencies-image]][dependencies-url]


A simple application demonstrating the basic usage of [Rucken](https://github.com/rucken) and [Angular5+](https://angular.io) with [NestJS](https://nestjs.com) as backend.


## Usage
- clone or fork [repository](https://github.com/rucken/core-nestjs.git) `git clone --recursive https://github.com/rucken/core-nestjs.git`
- make sure you have [node.js](https://nodejs.org/) installed version 6+
- make sure you have NPM installed version 3+
- run `npm install` to install project dependencies
- copy `_env` to `.env` and set environments for use (on Windows copy with IDE)
- run `npm run migrate` to run all migrations
- run `npm run start:prod` to fire up prod server (`npm run start:watch` - dev server)
- Go to frontend `cd frontend` and run `npm install` to install frontend dependencies
- Build frontend, run `npm run build` (`npm run start` - dev frontend server)
- Open browser to [`http://localhost:5000`](http://localhost:5000)

## Demo application on [Heroku](https://rucken-core-nestjs.herokuapp.com)

### Users
- user with admin group: admin@admin.com, password: 12345678
- user with user group: user1@user1.com, password: 12345678
- user with user group: user2@user2.com, password: 12345678

### Site
- local: http://localhost:5000
- online: https://rucken-core-nestjs.herokuapp.com

### Swagger
- local: http://localhost:5000/swagger
- online: https://rucken-core-nestjs.herokuapp.com/swagger
- apiKey template: ```JWT <token_generated_on_login>```

### Docs
- local: http://localhost:5000/docs
- online: https://rucken-core-nestjs.herokuapp.com/docs

## Quick links

[Live demo](https://rucken.github.io/core) [[source]](https://github.com/rucken/core) - Demo application (backend: http://www.mockapi.io).

[Live demo (SSR)](https://rucken.herokuapp.com) [[source]](https://github.com/rucken/core) - Demo application with server side rendering (backend: http://www.mockapi.io).

[Live demo (NestJS)](https://rucken-core-nestjs.herokuapp.com) [[source]](https://github.com/rucken/core-nestjs) - Demo application with live backend (backend: https://nestjs.com).

## License

MIT

[travis-image]: https://travis-ci.org/rucken/core-nestjs.svg?branch=master
[travis-url]: https://travis-ci.org/rucken/core-nestjs
[dependencies-image]: https://david-dm.org/rucken/core-nestjs/status.svg
[dependencies-url]: https://david-dm.org/rucken/core-nestjs
