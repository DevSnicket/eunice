#!/bin/bash

set -e

cd $(dirname "$0")

find . -type f \( \( -name "*.fs"  ! -path "./.store/**" ! -path "./website/**" ! -path "**/obj/**" \) -o -path ./website/csharp/git-log.txt \) -exec npx cspell --config ../cspell.json {} +