#!/bin/bash

set -e

cd $(dirname "$0")

rm ./index.html || true
cp ../../interactive/dist/index.html .