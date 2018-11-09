#!/usr/bin/env bash
(cd Processors && npm run test) \
&& \
(cd Renderer && npm run test)