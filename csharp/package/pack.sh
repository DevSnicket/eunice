#!/bin/bash

set -e

cd $(dirname "$0")

dotnet pack \
	../DevSnicket.Eunice.fsproj \
	-c Release