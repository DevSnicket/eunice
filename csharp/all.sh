#!/bin/bash

set -e

basePath=$(dirname "$0")

echo dotnet tool restore
(cd $basePath && dotnet tool restore)

echo delete bin, obj and TestResults directories
$basePath/clean.sh

echo copy index html from interactive
$basePath/WriteInteractiveInDirectoryPathWithYaml/copy-index-html-from-interactive-dist.sh

echo "build"
(cd $basePath && dotnet build)

echo "build tests"
(cd $basePath && dotnet build Tests)

echo test cases build restore
$basePath/Tests/TestCases/build-restore.sh

$basePath/test.sh
$basePath/lint.sh
$basePath/spellcheck.sh
$basePath/package/pack.sh