#!/usr/bin/env bash
(cd $(dirname $0)/javascript-analyzer-and-renderer && npm install) \
&& \
(cd $(dirname $0)/renderer && npm install)