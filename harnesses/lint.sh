#!/usr/bin/env bash
(cd javascript-analyzer-and-renderer && npm run lint) \
&& \
(cd renderer && npm run lint)