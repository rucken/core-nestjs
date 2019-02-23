# [1.0.0](https://github.com/rucken/core-nestjs/compare/0.8.7...1.0.0) (2019-02-23)


### Bug Fixes

* Move AccessGuard on auth module for correct work NestJS DI and custom passport strategies ([77aba8f](https://github.com/rucken/core-nestjs/commit/77aba8f))


### Features

* Update folders and files structures for work with nx mono repo template ([e860da1](https://github.com/rucken/core-nestjs/commit/e860da1))



## [0.8.7](https://github.com/rucken/core-nestjs/compare/0.8.6...0.8.7) (2019-02-11)


### Bug Fixes

* Update dependencies ([6c771ed](https://github.com/rucken/core-nestjs/commit/6c771ed))



## [0.8.6](https://github.com/rucken/core-nestjs/compare/0.8.5...0.8.6) (2019-01-12)


### Bug Fixes

* Remove map all fields on profile update ([997e1cf](https://github.com/rucken/core-nestjs/commit/997e1cf))
* Update dependencies ([b9c7c5e](https://github.com/rucken/core-nestjs/commit/b9c7c5e))



## [0.8.5](https://github.com/rucken/core-nestjs/compare/0.8.4...0.8.5) (2018-12-10)


### Bug Fixes

* Update dependencies ([60654eb](https://github.com/rucken/core-nestjs/commit/60654eb))
* **deps:** Update dependencies ([c9d6d3c](https://github.com/rucken/core-nestjs/commit/c9d6d3c))
* **user:** Add check user name and email on update profile, create and update user ([ab770a7](https://github.com/rucken/core-nestjs/commit/ab770a7))



## [0.8.4](https://github.com/rucken/core-nestjs/compare/0.8.3...0.8.4) (2018-11-17)


### Bug Fixes

* **auth:** Remove disabled error check exists email and username ([ce74e77](https://github.com/rucken/core-nestjs/commit/ce74e77))
* **auth:** Remove twice called signup action https://github.com/rucken/todo-nestjs/issues/2 ([60c0e3d](https://github.com/rucken/core-nestjs/commit/60c0e3d))
* **deps:** Update dependencies ([6891fa1](https://github.com/rucken/core-nestjs/commit/6891fa1))
* **user:** Update constraints first_name and last_name set isNullable: true ([53bc4bb](https://github.com/rucken/core-nestjs/commit/53bc4bb))



<a name="0.8.3"></a>
## [0.8.3](https://github.com/rucken/core-nestjs/compare/0.8.2...0.8.3) (2018-09-28)


### Bug Fixes

* Update dependencies ([a47caec](https://github.com/rucken/core-nestjs/commit/a47caec))



<a name="0.8.2"></a>
## [0.8.2](https://github.com/rucken/core-nestjs/compare/0.8.1...0.8.2) (2018-09-23)


### Bug Fixes

* **auth:** Remove authConfig, change it to coreConfig ([7cbc128](https://github.com/rucken/core-nestjs/commit/7cbc128))
* **auth:** Restore run default canActivate in AccessGuard ([1835e09](https://github.com/rucken/core-nestjs/commit/1835e09))
* **core:** Remove execute default guard check for access ([88a90a4](https://github.com/rucken/core-nestjs/commit/88a90a4))



<a name="0.8.1"></a>
## [0.8.1](https://github.com/rucken/core-nestjs/compare/0.8.0...0.8.1) (2018-09-21)


### Bug Fixes

* **deps:** Update dependencies and update source for it ([f997968](https://github.com/rucken/core-nestjs/commit/f997968))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/rucken/core-nestjs/compare/0.6.0...0.8.0) (2018-08-31)


### Bug Fixes

* Change token name GOOGLE_CONFIG_TOKEN => GOOGLE_PLUS_CONFIG_TOKEN ([1f3e7de](https://github.com/rucken/core-nestjs/commit/1f3e7de))
* **auth:** Add correct host name for generate redirect_uri ([7302066](https://github.com/rucken/core-nestjs/commit/7302066))
* **auth:** Add protocol for detect host if origin is not set ([4e40ce8](https://github.com/rucken/core-nestjs/commit/4e40ce8))
* **ci:** Update source for correct deploy with postgres database ([af58791](https://github.com/rucken/core-nestjs/commit/af58791))
* **core:** remove duplicate check ([fee5e6a](https://github.com/rucken/core-nestjs/commit/fee5e6a))
* **db:** Update detect db source ext ([7704d16](https://github.com/rucken/core-nestjs/commit/7704d16))
* **db:** Update detect sqlite database on production mode ([db53919](https://github.com/rucken/core-nestjs/commit/db53919))


### Features

* **auth:** Add info action and remove bad migrations ([e60b8e9](https://github.com/rucken/core-nestjs/commit/e60b8e9))
* **db:** Add deploy to Postgres on heroku ([#8](https://github.com/rucken/core-nestjs/issues/8)) ([7ed0756](https://github.com/rucken/core-nestjs/commit/7ed0756))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/rucken/core-nestjs/compare/0.6.0...0.7.0) (2018-08-12)


### Bug Fixes

* Change token name GOOGLE_CONFIG_TOKEN => GOOGLE_PLUS_CONFIG_TOKEN ([1f3e7de](https://github.com/rucken/core-nestjs/commit/1f3e7de))
* **auth:** Add correct host name for generate redirect_uri ([7302066](https://github.com/rucken/core-nestjs/commit/7302066))
* **auth:** Add protocol for detect host if origin is not set ([4e40ce8](https://github.com/rucken/core-nestjs/commit/4e40ce8))


### Features

* **auth:** Add info action and remove bad migrations ([e60b8e9](https://github.com/rucken/core-nestjs/commit/e60b8e9))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/rucken/core-nestjs/compare/0.5.0...0.6.0) (2018-08-05)


### Bug Fixes

* **auth:** Add catch facebookSignIn errors ([e5fde9b](https://github.com/rucken/core-nestjs/commit/e5fde9b))


### Features

* **auth:** Add auth module and add local, jwt, facebook authorization with passport ([ff66ae3](https://github.com/rucken/core-nestjs/commit/ff66ae3))
* **auth:** Add google auth controller action and reformat all source files ([387e22e](https://github.com/rucken/core-nestjs/commit/387e22e))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/rucken/core-nestjs/compare/0.4.1...0.5.0) (2018-07-30)


### Features

* **deps:** Update dependencies and refactor code for it ([d138b29](https://github.com/rucken/core-nestjs/commit/d138b29))


### BREAKING CHANGES

* **deps:** Set the package's minimum required NestJS 5.1.0



<a name="0.4.1"></a>
## [0.4.1](https://github.com/rucken/core-nestjs/compare/0.4.0...0.4.1) (2018-04-27)


### Bug Fixes

* **errors:** Change output of validation errors ([f166a3b](https://github.com/rucken/core-nestjs/commit/f166a3b))
* **front:** Update dependencies ([a39617b](https://github.com/rucken/core-nestjs/commit/a39617b))
* **front:** Update dependencies ([c66ccf7](https://github.com/rucken/core-nestjs/commit/c66ccf7))
* **front:** Update frontend ([15a4fe7](https://github.com/rucken/core-nestjs/commit/15a4fe7))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/rucken/core-nestjs/compare/0.3.0...0.4.0) (2018-04-22)


### Bug Fixes

* **front:** Add [@rucken](https://github.com/rucken)/core and [@rucken](https://github.com/rucken)/core dependencies ([381cbdc](https://github.com/rucken/core-nestjs/commit/381cbdc))


### Features

* **services:** Change attributes of methods services for work with database ([9c791f1](https://github.com/rucken/core-nestjs/commit/9c791f1))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/rucken/core-nestjs/compare/0.2.0...0.3.0) (2018-04-21)


### Bug Fixes

* **custom-exception:** Add render index.html if request error with browser ([f54f5c3](https://github.com/rucken/core-nestjs/commit/f54f5c3))
* **front:** Remove useHash in routes ([bf01bf0](https://github.com/rucken/core-nestjs/commit/bf01bf0))
* **migrations:** Add migration for init database ([8a05162](https://github.com/rucken/core-nestjs/commit/8a05162))
* **user.entity:** Add default value = false for boolean fields ([2fab7da](https://github.com/rucken/core-nestjs/commit/2fab7da))
* **user.entity:** Add transforms to boolean for bool property ([1f97ae3](https://github.com/rucken/core-nestjs/commit/1f97ae3))


### Features

* **demo-mode:** Add demo mode, only add new data, update and delete not allowed in this mode ([d4c861a](https://github.com/rucken/core-nestjs/commit/d4c861a))



<a name="0.2.0"></a>
# 0.2.0 (2018-04-15)


### Bug Fixes

* **access.guard:** Ignore controller methods if not set @Roles and @Permissions ([07efd21](https://github.com/rucken/core-nestjs/commit/07efd21))
* **account.service:** Remove regenerate token for "info" method, move it to "refresh" method ([040e16b](https://github.com/rucken/core-nestjs/commit/040e16b))
* **acoount.controller:** Remove use dto from service ([8a97bc2](https://github.com/rucken/core-nestjs/commit/8a97bc2))
* **ci:** Change postinstall to heroku-postbuild ([7bf80ae](https://github.com/rucken/core-nestjs/commit/7bf80ae))
* **controllers:** Add sort by id desc for all entities ([f4032cb](https://github.com/rucken/core-nestjs/commit/f4032cb))
* **controllers:** Change mode for make query for db in loadAll to createQueryBuilder ([f80c543](https://github.com/rucken/core-nestjs/commit/f80c543))
* **controllers:** Fix requests for rucken ([afe4933](https://github.com/rucken/core-nestjs/commit/afe4933))
* **controllers:** Move logic to services ([ae973ce](https://github.com/rucken/core-nestjs/commit/ae973ce))
* **controllers:** OrderBy error in query created with QueryBuilder ([e770923](https://github.com/rucken/core-nestjs/commit/e770923))
* **controllers:** Update for rucken ([5076527](https://github.com/rucken/core-nestjs/commit/5076527))
* **custom.error:** Change "message" property to "nonFieldErrors" for no validation errors ([32f01fe](https://github.com/rucken/core-nestjs/commit/32f01fe))
* **custom.error:** Remove duplicated variable ([25fb318](https://github.com/rucken/core-nestjs/commit/25fb318))
* **dto:** Update dto and response for rucken ([a26be4d](https://github.com/rucken/core-nestjs/commit/a26be4d))
* **dto:** Update dto based on user entities ([8b62775](https://github.com/rucken/core-nestjs/commit/8b62775))
* **filters:** Add debug mode for all errors handlers ([efc0c53](https://github.com/rucken/core-nestjs/commit/efc0c53))
* **front:** Manual update for correct work ([7adbb1f](https://github.com/rucken/core-nestjs/commit/7adbb1f))
* **user.entity:** Add check group exists ([2e2fdb1](https://github.com/rucken/core-nestjs/commit/2e2fdb1))
* **user.entity:** Ignore change password if not set ([d0328f6](https://github.com/rucken/core-nestjs/commit/d0328f6))
* **users.controller:** Fix permission name for read ([1f9c1ac](https://github.com/rucken/core-nestjs/commit/1f9c1ac))
* Correct calc totalPages with Math.ceil ([6fde315](https://github.com/rucken/core-nestjs/commit/6fde315))


### Features

* **db:** Add frontend permissions for navigate, rename old migration file ([5819df1](https://github.com/rucken/core-nestjs/commit/5819df1))
* **dto:** Change login, register and update profile dtos ([019f399](https://github.com/rucken/core-nestjs/commit/019f399))
* **front:** Add frontend based on rucken template ([8fba23d](https://github.com/rucken/core-nestjs/commit/8fba23d))
* **front:** Add new fronted [#6](https://github.com/rucken/core-nestjs/issues/6) ([f32d869](https://github.com/rucken/core-nestjs/commit/f32d869))
* **front:** Update fronted to new rucken ([a93e535](https://github.com/rucken/core-nestjs/commit/a93e535))
* **server:** Add cors support ([17c7e97](https://github.com/rucken/core-nestjs/commit/17c7e97))
* **service:** Add sort query parameter [#10](https://github.com/rucken/core-nestjs/issues/10) ([5bfe10b](https://github.com/rucken/core-nestjs/commit/5bfe10b))



