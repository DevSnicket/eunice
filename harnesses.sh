#!/usr/bin/env bash
(cd javascript-analyzer && npm run harness) \
&& \
(cd harness && npm run harness) \
&& \
(cd Renderer && npm run harness)