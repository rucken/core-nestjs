# rucken-core-nestjs

[![Greenkeeper badge](https://badges.greenkeeper.io/rucken/core-nestjs.svg)](https://greenkeeper.io/)
[![Build Status][travis-image]][travis-url]
[![dependencies-release][dependencies-image]][dependencies-url]

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/rucken/core-nestjs)

A simple application demonstrating the basic usage of permissions with NestJS (JWT, Passport, Facebook, Google+, User, Group, Permission)


## Features

* [NestJS](https://github.com/nestjs/nest) - a JS backend framework providing architecture out of the box with a syntax similar to Angular
* [TypeORM](https://github.com/mongodb/mongo) - ORM for TypeScript and JavaScript (ES7, ES6, ES5). Supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, WebSQL databases.
* [TypeScript](https://github.com/Microsoft/TypeScript) - superset of JS which compiles to JS, providing compile-time type checking
* [Passport](https://github.com/jaredhanson/passport) - a popular library used to implement JavaScript authentication (Facebook, Google+)
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - a JavaScript json web tokens implementation by auth0

## Usage
- clone or fork [repository](https://github.com/rucken/core-nestjs.git) `git clone --recursive https://github.com/rucken/core-nestjs.git`
- make sure you have [node.js](https://nodejs.org/) installed version 8+
- make sure you have NPM installed version 5+
- copy `develop._env` to `develop.env` and set environments for use (on Windows copy with IDE)
- run `npm install` to install project dependencies
- run `npm run build` to install project dependencies
- run `npm run start:prod` to fire up prod server (`npm run start:dev` - dev server)
- Open browser to [`http://localhost:5000/swagger`](http://localhost:5000/swagger)

## Usage with cli
```
npm install -g @rucken/cli
rucken new:nestjs my-app
cd my-app
npm install
npm run build
npm run start:prod
```

### Users
- user with admin group: admin@admin.com, password: 12345678
- user with user group: user1@user1.com, password: 12345678
- user with user group: user2@user2.com, password: 12345678

### Swagger
- local: [`http://localhost:5000/swagger`](http://localhost:5000/swagger)
- online on heroku: [`https://rucken-core-nestjs.herokuapp.com/swagger`](https://rucken-core-nestjs.herokuapp.com/swagger)
- online on now with db sqlite: [`https://rucken-core-nestjs.now.sh/swagger`](https://rucken-core-nestjs.now.sh/swagger)
- online on now with db postgres: [`https://rucken-core-nestjs-postgres.now.sh/swagger`](https://rucken-core-nestjs-postgres.now.sh/swagger)
- apiKey template: ```JWT <token_generated_on_login>```

### Docs
- local: [`http://localhost:5000/docs`](http://localhost:5000/docs)
- online on heroku: [`https://rucken-core-nestjs.herokuapp.com/docs`](https://rucken-core-nestjs.herokuapp.com/docs)
- online on now: [`https://rucken-core-nestjs.now.sh/docs`](https://rucken-core-nestjs.now.sh/docs)

### With UI on Angular 6+
- online on now with gh-pages: [`https://rucken.github.io/core`](https://rucken.github.io/core)
- online on now with ssr: [`https://rucken.now.sh`](https://rucken.now.sh)
- online on heroku with ssr: [`https://rucken.herokuapp.com`](https://rucken.herokuapp.com)

## License

MIT

[travis-image]: https://travis-ci.org/rucken/core-nestjs.svg?branch=master
[travis-url]: https://travis-ci.org/rucken/core-nestjs
[dependencies-image]: https://david-dm.org/rucken/core-nestjs/status.svg
[dependencies-url]: https://david-dm.org/rucken/core-nestjs
