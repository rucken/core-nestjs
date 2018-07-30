# rucken-core-nestjs

[![Greenkeeper badge](https://badges.greenkeeper.io/rucken/core-nestjs.svg)](https://greenkeeper.io/)
[![Build Status][travis-image]][travis-url]
[![dependencies-release][dependencies-image]][dependencies-url]

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/rucken/core-nestjs)

A simple application demonstrating the basic usage of permissions with NestJS (JWT, PasswordHash, User, Group, Permission, ContentType)


## Usage
- clone or fork [repository](https://github.com/rucken/core-nestjs.git) `git clone --recursive https://github.com/rucken/core-nestjs.git`
- make sure you have [node.js](https://nodejs.org/) installed version 8+
- make sure you have NPM installed version 5+
- copy `_env` to `.env` and set environments for use (on Windows copy with IDE)
- run `npm install` to install project dependencies
- run `npm build` to install project dependencies
- run `npm run start` to fire up prod server (`npm run start:dev` - dev server)
- Open browser to [`http://localhost:5000/swagger`](http://localhost:5000/swagger)

### Users
- user with admin group: admin@admin.com, password: 12345678
- user with user group: user1@user1.com, password: 12345678
- user with user group: user2@user2.com, password: 12345678

### Swagger
- local: http://localhost:5000/swagger
- online: https://rucken-core-nestjs.herokuapp.com/swagger
- apiKey template: ```JWT <token_generated_on_login>```

### Docs
- local: http://localhost:5000/docs
- online: https://rucken-core-nestjs.herokuapp.com/docs

## License

MIT

[travis-image]: https://travis-ci.org/rucken/core-nestjs.svg?branch=master
[travis-url]: https://travis-ci.org/rucken/core-nestjs
[dependencies-image]: https://david-dm.org/rucken/core-nestjs/status.svg
[dependencies-url]: https://david-dm.org/rucken/core-nestjs
