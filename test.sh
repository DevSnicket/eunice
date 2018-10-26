#!/usr/bin/env bash
(cd Analyzer && npm run test) \
&& \
(cd dependencyAndStructure && npm run test) \
&& \
(cd Processors && npm run test) \
&& \
(cd Renderer && npm run test)