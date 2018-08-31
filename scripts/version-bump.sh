#!/bin/bash
preset=`node_modules/.bin/conventional-commits-detector`
echo $preset
bump=`node_modules/.bin/conventional-recommended-bump -p angular`
echo ${1:-$bump}
npm --no-git-tag-version version ${1:-$bump} &>/dev/null
node_modules/.bin/conventional-changelog -i CHANGELOG.md -s -p ${2:-$preset}
read -p "Press any key to continue... " -n1 -s
