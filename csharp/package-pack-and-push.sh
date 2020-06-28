#!/bin/bash

dotnet pack \
	DevSnicket.Eunice.fsproj \
	-c Release

dotnet nuget push \
	bin/Release/eunice.1.0.0.nupkg \
	-k oy2fu5oaedz2xsna7lnqiv2i6bi5iy3uhmmvssybe53s2u \
	-s https://api.nuget.org/v3/index.json \
	--skip-duplicate