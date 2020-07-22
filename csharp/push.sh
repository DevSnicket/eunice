#!/bin/bash

set -e

./clean.sh
./WriteInteractiveInDirectoryPathWithYaml/download-and-extract-package.sh
./Tests/TestCases/build-restore.sh
./test.sh
./lint.sh
./spellcheck.sh
./package/pack.sh
git push $1