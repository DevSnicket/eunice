#!/bin/bash

set -e

./clean.sh
./AnalyzeProjectOrSolutionPath/Tests/TestCases/restore.sh
./test.sh
./lint.sh
./git-log-write-file.sh
./spellcheck.sh
./package-pack.sh
git push $1