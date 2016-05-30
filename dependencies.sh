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
  echo "Running $repo as Background Process"
  npm start &
  cd "../"
done