#!/bin/bash

find . -type f \( \( -name "*.fs"  ! -path "./.store/**" ! -path "./website/**" ! -path "**/obj/**" \) -o -path ./website/csharp/git-log.txt \) -exec npx cspell@4.0.30 {} +