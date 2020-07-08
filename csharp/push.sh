#!/bin/bash

set -e

./clean.sh
./AnalyzeProjectOrSolutionPath/Tests/TestCases/build-restore.sh
./test.sh
./lint.sh
./spellcheck.sh
./package/pack.sh
git push $1