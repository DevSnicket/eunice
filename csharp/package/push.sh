#!/bin/bash

cd $(dirname "$0")

dotnet nuget push \
	../bin/Release/eunice.*.nupkg \
	-k oy2fu5oaedz2xsna7lnqiv2i6bi5iy3uhmmvssybe53s2u \
	-s https://api.nuget.org/v3/index.json \
	--skip-duplicate