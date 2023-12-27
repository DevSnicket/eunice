#!/bin/bash

set -e

curl -o dotnet-install.sh https://dotnet.microsoft.com/download/dotnet/scripts/v1/dotnet-install.sh

chmod +x dotnet-install.sh

./dotnet-install.sh --channel 3.1
./dotnet-install.sh --channel 5.0
./dotnet-install.sh --channel 6.0
./dotnet-install.sh --channel 7.0
./dotnet-install.sh --channel 8.0