#!/bin/bash
mkdir dogfooding.output

node Analyzers/JavaScript/getOrCreateItemsInDirectory --directory=. --ignoreDirectoryNames=Coverage --ignoreDirectoryNames=getOrCreateItemsInDirectory.testcases --ignoreDirectoryNames=getYamlFromJavaScript.testcases --ignoreDirectoryNames=node_modules --ignoreDirectoryNames=Output | 
node Processors/setTypeOfRootItems --type=file |
node Processors/groupItemsByIdentifierSeparator --identifierSeparator=/ |
node Processors/orderItemsByType --typesInOrder= --typesInOrder=parameter --typesInOrder=variable --typesInOrder=file |
node Processors/unstackIndependent |
node Processors/stackRootItems --levels=harness --levels=Analyzers/JavaScript,Processors,Renderer --levels=callWhenProcessEntryPoint,dependencyAndStructure,Harnesses,Tests > dogfooding.output/.yaml

cat dogfooding.output/.yaml | node Renderer/getSvgForYaml > dogfooding.output/.svg