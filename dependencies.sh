#!/bin/bash

GIT_USER="Vandise"
DEPENDENCIES=("ConnectServer" "LoginServer")

for repo in "${DEPENDENCIES[@]}"
do
  git clone "https://github.com/$GIT_USER/$repo"
  cd "$repo/"
  echo "Current Directory:"
  pwd
  npm install
  npm start &
  cd "../"
done