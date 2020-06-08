#!/bin/bash

set -e

./test.sh
./git-log-write-file.sh
./spellcheck.sh
git push $1