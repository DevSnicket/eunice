#!/usr/bin/env bash
(cd dependencyAndStructure && npm run lint) \
&& \
(cd javascript-analyzer && npm run lint) \
&& \
(cd javascript-analyzer-and-renderer-harness && npm run lint) \
&& \
(cd Processors && npm run lint) \
&& \
(cd Renderer && npm run lint)