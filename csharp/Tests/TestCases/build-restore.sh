#!/bin/bash

set -e
cd $(dirname "$0")
dotnet fsi --exec writeSolution.fsx
dotnet build build.sln
dotnet restore restore-target-framework-supported.sln
dotnet restore restore-target-framework-not-supported.sln -p:targetframeworks=netstandard2.0