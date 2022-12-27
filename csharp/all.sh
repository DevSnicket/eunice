#!/bin/bash

set -e

cd $(dirname "$0")

./clean.sh
./WriteInteractiveInDirectoryPathWithYaml/copy-index-html-from-interactive-dist.sh
dotnet build Tests
./Tests/TestCases/build-restore.sh
./test.sh
./lint.sh
./spellcheck.sh
./package/pack.sh