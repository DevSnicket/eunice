#!/bin/bash

set -e

./lint.sh
./clean.sh
./AnalyzeProjectOrSolutionPath/Tests/TestCases/restore.sh
./test.sh
./git-log-write-file.sh
./spellcheck.sh
git push $1