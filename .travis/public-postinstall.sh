#!/bin/bash
node ./scripts/patch.js
npm i --save ./dist/rucken/core-nestjs
npm i --save ./dist/rucken/auth-nestjs