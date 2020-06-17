#!/bin/bash

set -e

./spellcheck.sh
./clean.sh
./AnalyzeProjectOrSolutionPath/Tests/TestCases/restore.sh
./test.sh
./git-log-write-file.sh
git push $1