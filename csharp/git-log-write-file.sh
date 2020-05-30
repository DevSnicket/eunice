#!/bin/bash

mkdir website
mkdir website/csharp

git log \
	--date=short \
	--pretty='format:---%n%ad%n%B' \
	> website/csharp/git-log.txt