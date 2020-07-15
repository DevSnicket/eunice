#!/bin/bash

set -e

cd $(dirname "$0")

echo build
echo

find . -type f \
	\( \
		-path "./MembersNone/*.csproj" \
		-o \
		-path "./MembersLevel/Valid/*.csproj" \
	\) \
	\( -exec dotnet build {} --nologo \; -o -quit \)

echo
echo restore
echo

find . -type f \
	-path "./MembersLevel/Invalid/TargetFrameworkSupported/*.csproj" \
	\( -exec dotnet restore {} \; -o -quit \)

find . -type f \
	-path "./MembersLevel/Invalid/TargetFrameworkNotSupported/*.csproj" \
	\( -exec dotnet restore {} -p:targetframeworks=netstandard2.0 \; -o -quit \)