#!/bin/bash

rm -rf website

git submodule add --force \
	https://$1@github.com/DevSnicket/eunice.git \
	website

bash ./git-log-write-file.sh

cd website

git add csharp/git-log.txt

git config --add user.email  grahamdyson@hotmail.com
git config --add user.name "GitHub pages publish"

if [[ `git status --porcelain` ]]; then
	git commit -m "C# Git log update";
	git push;
fi