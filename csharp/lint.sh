#!/bin/bash

set -e

for filePath in $(find ! -path "*/obj/*" -name "*.fs"); do
	read -r firstLine<$filePath
	if [ "$firstLine" != "// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential." ]; then
		if [ ! $hasMissingNotices ]; then
			echo The following files are missing a copyright notice:
			echo
		fi
		hasMissingNotices=true
		echo $filePath
	fi
done
[ $hasMissingNotices ] && exit 1

dotnet tool install dotnet-fsharplint \
--tool-path . \
--version 0.16.3 \
|| true # ignore error raised when already installed

./dotnet-fsharplint lint --lint-config lint.json DevSnicket.Eunice.fsproj

./dotnet-fsharplint lint --lint-config lint.json Tests/DevSnicket.Eunice.Tests.fsproj