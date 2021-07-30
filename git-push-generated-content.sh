git checkout website
git add .

if [[ `git status --porcelain` ]]; then
	git remote set-url origin https://$1@github.com/DevSnicket/eunice.git
	git commit -m "generated content";
	git push;
fi