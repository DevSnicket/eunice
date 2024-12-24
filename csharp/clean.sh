#!/bin/bash

set -e

cd $(dirname "$0")

find . -type d \( -name bin -o -name obj -o -name TestResults \) -exec rm -rf {} \; || true