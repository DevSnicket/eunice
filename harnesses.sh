#!/usr/bin/env bash
(cd Analyzer && npm run harness) \
&& \
(cd harness && npm run harness) \
&& \
(cd Renderer && npm run harness)