#!/usr/bin/env bash
(cd $(dirname $0)/javascript-analyzer-and-renderer && npm run lint) \
&& \
(cd $(dirname $0)/renderer && npm run lint)