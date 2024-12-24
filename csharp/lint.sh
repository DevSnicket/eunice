#!/bin/bash

set -e

cd $(dirname "$0")

echo checking F# source file copyright notices
for filePath in $(find ! -path "*/obj/*" -name "*.fs"); do
	read -r firstLine<$filePath
	if [ "$firstLine" != "// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential." ]; then
		if [ ! $hasMissingNotices ]; then
			echo the following files are missing a copyright notice:
			echo
		fi
		hasMissingNotices=true
		echo $filePath
	fi
done
[ $hasMissingNotices ] && exit 1

echo running fsharplint
dotnet dotnet-fsharplint lint --lint-config lint.json DevSnicket.Eunice.fsproj
dotnet dotnet-fsharplint lint --lint-config lint.json Tests/DevSnicket.Eunice.Tests.fsproj