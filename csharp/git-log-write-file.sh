#!/bin/bash

mkdir website
mkdir website/csharp

git log \
	--date=short \
	--pretty='format:---%n%ad%n%B' \
	1324ddb8213e2524dbacf93d39e9a792ffaafc77..d58051c47731e2ff0da15afa87cee7ba53e9c155 \
	> website/csharp/git-log.txt