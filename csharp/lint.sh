#!/bin/bash

set -e

dotnet tool install dotnet-fsharplint \
--tool-path . \
--version 0.16.3 \
|| true # ignore error raised when already installed

./dotnet-fsharplint lint --lint-config lint.json DevSnicket.Eunice.fsproj

./dotnet-fsharplint lint --lint-config lint.json Tests/DevSnicket.Eunice.Tests.fsproj