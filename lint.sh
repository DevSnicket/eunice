#!/usr/bin/env bash
(cd Analyzer && npm run lint) \
&& \
(cd callWhenProcessEntryPoint && npm run lint) \
&& \
(cd dependencyAndStructure && npm run lint) \
&& \
(cd harness && npm run lint) \
&& \
(cd harness && npm run lint) \
&& \
(cd Processors && npm run lint) \
&& \
(cd Renderer && npm run lint) \
&& \
(cd runTestsFromFileSystem && npm run lint)