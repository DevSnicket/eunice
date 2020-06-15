#!/bin/bash

set -e

./clean.sh
./test.sh
./git-log-write-file.sh
./spellcheck.sh
git push $1