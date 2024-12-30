#!/bin/bash
set -e
cd $(dirname "$0")

echo testing .NET 6 bin
(cd Tests/bin/Release/netcoreapp6.0 && ./eunice ../../../TestCases/MembersNone/Class/Empty/TestCase.csproj)

echo testing .NET 7 bin
(cd Tests/bin/Release/netcoreapp7.0 && ./eunice ../../../TestCases/MembersNone/Class/Empty/TestCase.csproj)

echo testing .NET 8 bin
bin/Release/netcoreapp8.0/eunice Tests/TestCases/MembersNone/Class/Empty/TestCase.csproj