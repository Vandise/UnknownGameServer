#!/bin/bash

GIT_USER="Vandise"
DEPENDENCIES=("ConnectServer" "LoginServer")

echo "Installing Dependencies: "

for repo in "${DEPENDENCIES[@]}"
do
  git clone "https://github.com/$GIT_USER/$repo"
  cd "$repo/"
  echo "Current Directory:"
  pwd
  echo "Installing Package Dependencies: "
  npm install
  gulp
  echo "Running $repo as Background Process"
  node ./dist/server -e test &
  cd "../"
done