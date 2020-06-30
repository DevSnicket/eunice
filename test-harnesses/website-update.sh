#!/bin/bash

set -e

rm -rf gh-pages
git submodule add --force https://$1@github.com/DevSnicket/Eunice.git gh-pages
cp -r favicon.ico gh-pages
cd gh-pages
git add .
git config --add user.email grahamdyson@hotmail.com
git config --add user.name "GitHub pages publish"
if [[ `git status --porcelain` ]]; then
	git commit -m "test harnesses favicon update";
	git push;
fi