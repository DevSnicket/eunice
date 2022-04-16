#!/bin/bash

set -e

script=${1:-all}

(cd run-tests-from-file-system && npm run $script)
(cd test-harnesses && npm run $script)
(cd dependency-and-structure && npm run $script)
(cd dependency-counter && npm run $script)
(cd javascript/analyzer && npm run $script)
(cd interactive && npm run $script)
(cd stacking-explicit && npm run $script)
(cd stacking-inference && npm run $script)
(cd visualizer && npm run $script)
(cd javascript && npm run $script)

./website-update.sh $2 $3