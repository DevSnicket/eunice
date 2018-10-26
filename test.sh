#!/usr/bin/env bash
(cd dependencyAndStructure && npm run test) \
&& \
(cd javascript-analyzer && npm run test) \
&& \
(cd Processors && npm run test) \
&& \
(cd Renderer && npm run test)