#!/bin/bash

cd $(dirname "$0")

dotnet nuget push \
	../bin/Release/eunice.*.nupkg \
	-k $1 \
	-s https://api.nuget.org/v3/index.json \
	--skip-duplicate