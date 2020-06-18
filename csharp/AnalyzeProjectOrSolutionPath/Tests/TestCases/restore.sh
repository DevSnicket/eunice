#!/bin/bash

# https://github.com/dotnet/roslyn/issues/44822

cd $(dirname "$0")

find . -type f \
	-name "*.csproj" \
	! -path "./Invalid/Solution/FirstTargetFrameworkNotSupported/Project.csproj" \
	! -path "./Invalid/Solution/TargetFrameworksNotSupported/Project.csproj" \
	! -path "./Invalid/TargetFrameworkNotSupported/TestCase.csproj" \
	\( -exec dotnet restore {} \; -o -quit \)

dotnet restore \
	Invalid/Solution/FirstTargetFrameworkNotSupported/Project.csproj \
	-p:targetframeworks=netstandard2.0

dotnet restore \
	Invalid/TargetFrameworkNotSupported/TestCase.csproj \
	-p:targetframework=netstandard2.0