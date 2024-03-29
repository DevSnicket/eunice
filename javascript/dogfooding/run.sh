#!/bin/bash
rm -rf output
mkdir output
cd .. 
node dist/bin.js \
--directories=.. \
--ignore-path-pattern="(^|/)(\\..*|dist|gh-pages|node_modules|output|test-cases|test-coverage|website)$" \
--include-service-workers=true \
--modify-stacks-key=type \
--modify-stacks-pattern=^file$ \
--output-base-file-name=index \
--output-directory-path=dogfooding/output \
--output-svg \
--output-yaml \
--reverseFileContent=false \
--stackFileContent=true