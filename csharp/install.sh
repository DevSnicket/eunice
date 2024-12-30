#!/bin/bash

set -e

curl -o dotnet-install.sh https://dotnet.microsoft.com/download/dotnet/scripts/v1/dotnet-install.sh

chmod +x dotnet-install.sh

./dotnet-install.sh --version 6.0.428
./dotnet-install.sh --version 7.0.410
./dotnet-install.sh --version 8.0.404