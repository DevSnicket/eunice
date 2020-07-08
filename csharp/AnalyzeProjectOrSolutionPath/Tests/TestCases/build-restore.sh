#!/bin/bash

set -e

cd $(dirname "$0")

bash ./Invalid/restore.sh
bash ./Valid/build.sh