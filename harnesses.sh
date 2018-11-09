#!/usr/bin/env bash
(cd javascript-analyzer-and-renderer-harness && npm run harness) \
&& \
(cd Renderer && npm run harness)