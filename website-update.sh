git submodule add -b website --force https://@github.com/DevSnicket/eunice.git website

echo website copy of interactive
rm -f -rf website/interactive
cp -r interactive/tests/example/output website/interactive

echo website copy of javascript
rm -rf website/dogfooding
cp -r javascript/dogfooding/output website/dogfooding
mkdir -p website/javascript
rm -rf website/javascript/harness
cp -r javascript/harness/output website/javascript/harness

echo website copy of javascript/analyzer
rm -f -rf website/javascript/analyzer-harness
cp -r javascript/analyzer/harness/output website/javascript/analyzer-harness

echo website copy of test-harnesses
cp -r test-harnesses/favicon.ico website

echo website copy of visualizer
rm -f -rf website/arrows &&
cp -r visualizer/createDependencyGroupFactories/createArrows/tests/withUse/test-cases website/arrows &&
cp visualizer/createDependencyGroupFactories/createArrows/tests/symbols/test-cases/down-10x10-*.svg website/arrows &&
rm -f -rf website/examples &&
mkdir website/examples &&
mkdir website/examples/level &&
cp visualizer/tests/test-cases/examples/item-depends-upon-parent/.svg website/examples/item-depends-upon-parent.svg &&
cp visualizer/tests/test-cases/examples/level/first-depends-upon-second/.svg website/examples/level/first-depends-upon-second.svg &&
cp visualizer/tests/test-cases/examples/level/first-item-depends-upon-second-item/.svg website/examples/level/first-item-depends-upon-second-item.svg &&
cp visualizer/tests/test-cases/examples/level/two-interdependent/.svg website/examples/level/two-interdependent.svg &&
cp visualizer/tests/test-cases/examples/parent-depends-upon-item/.svg website/examples/parent-depends-upon-item.svg &&
mkdir website/examples/stack &&
cp visualizer/tests/test-cases/examples/stack/lower-depends-upon-upper/.svg website/examples/stack/lower-depends-upon-upper.svg &&
cp visualizer/tests/test-cases/examples/stack/two-interdependent/.svg website/examples/stack/two-interdependent.svg &&
cp visualizer/tests/test-cases/examples/stack/upper-depends-upon-lower/.svg website/examples/stack/upper-depends-upon-lower.svg &&
cp visualizer/tests/test-cases/examples/two/.svg website/examples/two.svg &&
mkdir website/examples/parent &&
cp visualizer/tests/withParent/test-cases/examples/upper-child-depends-upon-lower-child/.svg website/examples/parent/upper-child-depends-upon-lower-child.svg
cp visualizer/tests/withParent/test-cases/examples/inner-dependencies-of-multiple-children/.svg website/examples/parent/inner-dependencies-of-multiple-children.svg
cp visualizer/tests/withParent/test-cases/examples/outer-dependencies/.svg website/examples/parent/outer-dependencies.svg

cd website

bash ./spellcheck.sh
if [ "$1" ]; then
	echo updating website

	bash ./update-all.sh $1;
fi

git_branch="$(git branch --show-current)"
if [[ "$2" && "$git_branch" = "main" ]]; then
	echo website Git add
	git add .

	echo website Git config
	git config --global user.name "GitHub pages publish"
	git config --global user.email 'bot@noreply.github.com'
	git remote set-url origin https://x-access-token:$1@github.com/$2

	if [[ `git status --porcelain` ]]; then
		echo website Git commit
		git commit -m "Automatic update from main branch";
		echo website Git push
		git push;
	fi
fi