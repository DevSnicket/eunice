#!/bin/bash

cd $(dirname "$0")

find . -type f -name "*.csproj" \( -exec dotnet build {} --nologo \; -o -quit \)