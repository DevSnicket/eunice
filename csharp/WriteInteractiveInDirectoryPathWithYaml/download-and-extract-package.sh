#!/bin/bash

cd $(dirname "$0")

rm devsnicket-eunice-interactive-*.tgz
npm pack @devsnicket/eunice-interactive@5.9.1
tar xvf devsnicket-eunice-interactive-*.tgz package/dist/index.html --strip-components 2