#!/bin/bash

cd $(dirname "$0")

find . -type f -name "*.csproj" ! -path "./Invalid/Solution/FirstTargetFrameworkNotSupported/Project.csproj" \( -exec dotnet restore {} \; -o -quit \)

dotnet restore Invalid/Solution/FirstTargetFrameworkNotSupported/Project.csproj -p:targetframeworks=netstandard2.0