[![Greenkeeper badge](https://badges.greenkeeper.io/rucken/core-nestjs.svg)](https://greenkeeper.io/)
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/sda540c6vpj47cx7/branch/master?svg=true)](https://ci.appveyor.com/project/EndyKaufman/core-nestjs/branch/master)
[![dependencies-release][dependencies-image]][dependencies-url]

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/rucken/core-nestjs)

Basic entities, services and controllers for oauth authorization in [NestJS](https://github.com/nestjs/nest) REST backend

## Features

- [NestJS](https://github.com/nestjs/nest) - a JS backend framework providing architecture out of the box with a syntax similar to Angular
- [TypeORM](http://typeorm.io/) - ORM for TypeScript and JavaScript (ES7, ES6, ES5). Supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, WebSQL databases.
- [TypeScript](https://github.com/Microsoft/TypeScript) - superset of JS which compiles to JS, providing compile-time type checking
- [Passport](https://github.com/jaredhanson/passport) - a popular library used to implement JavaScript authentication (Facebook, Google+)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - a JavaScript json web tokens implementation by auth0
- [@nrwl/schematics](https://github.com/nrwl/nx/blob/master/packages/schematics/src/collection.json) - Angular CLI power-ups for modern development, example usage: `ng g @nrwl/schematics:node-app app-name --framework nestjs`
- [@nestjs/schematics](https://github.com/nestjs/schematics/blob/master/src/collection.json) - Nest architecture element generation based on Angular schematics, example usage: `ng g @nestjs/schematics:library lib-name`

## Usage

- clone or fork [repository](https://github.com/rucken/core-nestjs.git) `git clone --recursive https://github.com/rucken/core-nestjs.git`
- make sure you have [node.js](https://nodejs.org/) installed version 11+
- copy `develop._env` to `develop.env` and set environments for use (on Windows copy with IDE)
- run `npm install` to install project dependencies
- run `npm run build` to install project dependencies
- run `npm run start:prod` to fire up prod server (`npm run start:dev` - dev server)
- Open browser to [`http://localhost:5000/swagger`](http://localhost:5000/swagger)

## Demo

[https://core-nestjs.rucken.io](https://core-nestjs.rucken.io) - Application with [Sqlite](https://www.sqlite.org/index.html) Database on VPS with [Dokku](http://dokku.viewdocs.io/dokku/)

### Users

- user with admin group: admin@admin.com, password: 12345678
- user with user group: user1@user1.com, password: 12345678
- user with user group: user2@user2.com, password: 12345678

### Swagger

- local: [`http://localhost:5000/swagger`](http://localhost:5000/swagger)
- online: [`https://core-nestjs.rucken.io/swagger`](https://core-nestjs.rucken.io/swagger)
- apiKey template: `JWT <token_generated_on_login>`

## Typedoc documentations

- local: [`http://localhost:5000/docs`](http://localhost:5000/docs)
- online: [`https://core-nestjs.rucken.io/docs`](https://core-nestjs.rucken.io/docs)

## Quick links

### Frontend (with core)

[@rucken/core](https://github.com/rucken/core) - Core with Admin UI for web application maked on [Angular7+](https://angular.io) and [Bootstrap3](https://valor-software.com/ngx-bootstrap/).

[@rucken/todo](https://github.com/rucken/todo) - Core with UI for web todo application maked on [Angular7+](https://angular.io) and [Bootstrap3](https://valor-software.com/ngx-bootstrap/).

### Backend

[@rucken/core-nestjs](https://github.com/rucken/core-nestjs) - A simple application demonstrating the basic usage of permissions with [NestJS](https://nestjs.com/) (JWT, Passport, Facebook, Google+, User, Group, Permission).

[@rucken/todo-nestjs](https://github.com/rucken/todo-nestjs) - A simple todo application with [NestJS](https://nestjs.com/) (Projects, Tasks, Statuses).

### Mobile

[@rucken/ionic](https://github.com/rucken/ionic) - Admin UI for [Ionic4](https://beta.ionicframework.com) with [Angular7+](https://angular.io) mobile application.

[@rucken/todo-ionic](https://github.com/rucken/todo-ionic) - Admin UI for [Ionic4](https://beta.ionicframework.com) with [Angular7+](https://angular.io) mobile todo application

### Console

[@rucken/cli](https://github.com/rucken/cli) - Console tools to create and build [Angular7+](https://angular.io/) and [NestJS](https://nestjs.com/) application based on [Rucken](https://github.com/rucken) template

## License

MIT

[travis-image]: https://travis-ci.org/rucken/core-nestjs.svg?branch=master
[travis-url]: https://travis-ci.org/rucken/core-nestjs
[dependencies-image]: https://david-dm.org/rucken/core-nestjs/status.svg
[dependencies-url]: https://david-dm.org/rucken/core-nestjs
[npm-image]: https://badge.fury.io/js/%40rucken%2Fauth-nestjs.svg
[npm-url]: https://npmjs.org/package/@rucken/auth-nestjs
