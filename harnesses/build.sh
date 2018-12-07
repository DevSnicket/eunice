#!/usr/bin/env bash
(cd javascript-analyzer-and-renderer && npm run build) \
&& \
(cd renderer && npm run build)