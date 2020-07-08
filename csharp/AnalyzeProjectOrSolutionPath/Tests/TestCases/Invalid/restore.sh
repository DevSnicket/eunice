#!/bin/bash

# https://github.com/dotnet/roslyn/issues/44822

set -e

cd $(dirname "$0")

find . -type f \
	-name "*.csproj" \
	! -path "./Solution/FirstTargetFrameworkNotSupported/Project.csproj" \
	! -path "./Solution/TargetFrameworksNotSupported/Project.csproj" \
	! -path "./TargetFrameworkNotSupported/TestCase.csproj" \
	\( -exec dotnet restore {} \; -o -quit \)

dotnet restore \
	Solution/FirstTargetFrameworkNotSupported/Project.csproj \
	-p:targetframeworks=netstandard2.0

dotnet restore \
	TargetFrameworkNotSupported/TestCase.csproj \
	-p:targetframework=netstandard2.0