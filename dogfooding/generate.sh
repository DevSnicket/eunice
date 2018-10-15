#!/bin/bash
outputDirectory=$(dirname $0)/output

mkdir $outputDirectory

node Analyzers/JavaScript/getOrCreateItemsInDirectory --directory=. --ignoreDirectoryNames=Coverage --ignoreDirectoryNames=testcases --ignoreDirectoryNames=node_modules --ignoreDirectoryNames=Output | 
node Processors/setTypeOfRootItems --type=file |
node Processors/removeIdentifierSuffix --suffix=/index |
node Processors/orderItemsBy/identifier |
node Processors/groupItemsByIdentifierSeparator --identifierSeparator=/ |
node Processors/removeRedundantParentIdentifierPrefix --identifierSeparator=/ |
node Processors/removeSelfDependentItemsOfType --type=variable |
node Processors/orderItemsBy/indexOf/type --typesInOrder= --typesInOrder=parameter --typesInOrder=variable --typesInOrder=file |
node Processors/createOrAddToStacks/uniformly --commaSeparatedLevels=test --commaSeparatedLevels=existing |
node Processors/createOrAddToStacks/usingFileSystem --directory=$(dirname $0)/.. |
node Processors/unstackIndependent > $outputDirectory/.yaml

cat $outputDirectory/.yaml | node Renderer/getSvgForYaml > $outputDirectory/.svg