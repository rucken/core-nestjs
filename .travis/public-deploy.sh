#!/bin/bash

# REMOTE_HOST=https://domain.name
# REMOTE_HOST_IP=127.0.0.1
# REMOTE_HOST_GIT_URL=dokku@127.0.0.1:dokku-app-name

# For testing public-deploy.sh on local machine, set LOCAL=true

setup_ssh() {
    eval "$(ssh-agent -s)"
    chmod 600 .travis/deploy.key
    ssh-add .travis/deploy.key
    ssh-keyscan ${REMOTE_HOST} >> $HOME/.ssh/known_hosts
    ssh-keyscan ${REMOTE_HOST_IP} >> $HOME/.ssh/known_hosts
}
create_folder(){
  rm -rf ./deploy
  mkdir deploy
}
setup_git() {
  git config user.email "travis@travis-ci.org"
  git config user.name "Travis CI"
  cd deploy
  git init
  git remote add deploy "${REMOTE_HOST_GIT_URL}" > /dev/null 2>&1
  git config push.default simple
  git remote -v
  git fetch deploy master
  git pull deploy master
  cd ..
}
copy_files() {
  ./scripts/postinstall.sh
  rm -rf ./deploy/scripts
  rm -rf ./deploy/dist
  rm -rf ./deploy/client
  rm -rf ./dist/node_modules
  rm -rf ./dist/rucken/core-nestjs/node_modules
  rm -rf ./dist/rucken/auth-nestjs/node_modules
  mkdir ./deploy/scripts
  mkdir ./deploy/dist
  mkdir ./deploy/client
  cp -rf ./scripts/* ./deploy/scripts
  cp -rf ./dist/* ./deploy/dist
  cp -rf ./client/* ./deploy/client
  cp -f ./package.json ./deploy/package.json 
  cp -f ./.gitignore ./deploy/.gitignore
  cp -f ./ormconfig.js ./deploy/ormconfig.js
  cp -f ./angular.json ./deploy/angular.json
  cp -f ./tsconfig.json ./deploy/tsconfig.json
  cp -f ./README.md ./deploy/README.md 
  cp -f ./.travis/public-postinstall.sh ./deploy/scripts/postinstall.sh
  cp -f ./.travis/public-preinstall.sh ./deploy/scripts/preinstall.sh
  node ./.travis/public-patch.js
}
commit_files() { 
  cd deploy
  git add .
  git commit --message "Version: $PACKAGE_VERSION Commit: $TRAVIS_COMMIT"
  git push --quiet --set-upstream deploy master
  cd ..
}

upload_files() {
  rm -rf .git
  cd deploy
  git push deploy master
  cd ..
}

if [[ $TRAVIS_BRANCH == 'master' ]]
then
  PACKAGE_VERSION=$(cat package.json \
    | grep version \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g')
  export PACKAGE_VERSION=$PACKAGE_VERSION

  setup_ssh
  create_folder
  setup_git
  copy_files
  commit_files
  upload_files
fi
if [[ $LOCAL == 'true' ]]
then
  create_folder
  copy_files
fi