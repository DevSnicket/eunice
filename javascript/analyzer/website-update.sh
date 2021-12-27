rm -rf website

git submodule add --force \
	https://$1@github.com/DevSnicket/eunice.git \
	website

rm -f -rf website/javascript/analyzer-harness
cp -r harness/output website/javascript/analyzer-harness
rm website/javascript/analyzer-harness/harness.js.map

cd website
git add .

git config --add user.email grahamdyson@hotmail.com
git config --add user.name "GitHub pages publish"

if [[ `git status --porcelain` ]]; then
	git commit -m "JavaScript analyzer harness";
	git push;
fi