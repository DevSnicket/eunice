#!/bin/bash

echo deleting bin, obj and TestResults directories
find . -type d \( -name bin -o -name obj -o -name TestResults \) -exec rm -rf {} \; || true