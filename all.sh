#!/bin/bash

set -e

script=${1:-all}

for packageDirectoryName in run-tests-from-file-system test-harnesses dependency-and-structure dependency-counter javascript/analyzer interactive stacking-explicit stacking-inference visualizer javascript
do
	echo
	echo Running \"${script}\" NPM script in $packageDirectoryName package directory
	echo

	(cd $packageDirectoryName && npm run $script)
done

./website-update.sh $2 $3
