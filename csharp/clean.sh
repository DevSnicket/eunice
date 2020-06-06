#!/bin/bash

find . -type d \( -name bin -o -name obj -o -name TestResults \) -exec rm -rf {} \; || true