#!/bin/bash

set -e

cd $(dirname "$0")

dotnet tool restore
./clean.sh
./WriteInteractiveInDirectoryPathWithYaml/copy-index-html-from-interactive-dist.sh

echo "build tests (and project referenced main project)"
dotnet build Tests

./Tests/TestCases/build-restore.sh
./test.sh
./lint.sh
./spellcheck.sh
./package/pack.sh