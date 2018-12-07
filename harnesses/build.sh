#!/usr/bin/env bash
(cd $(dirname $0)/javascript-analyzer-and-renderer && npm run build) \
&& \
(cd $(dirname $0)/renderer && npm run build)