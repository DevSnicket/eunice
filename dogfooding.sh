#!/bin/bash
mkdir dogfooding.output

node Analyzers/JavaScript/getOrCreateItemsInDirectory.js --directory=. --ignoreDirectoryNames=Coverage --ignoreDirectoryNames=getOrCreateItemsInDirectory.testcases --ignoreDirectoryNames=getYamlFromJavaScript.testcases --ignoreDirectoryNames=node_modules --ignoreDirectoryNames=Output | 
node Processors/setTypeOfRootItems.js --type=file |
node Processors/groupItemsByIdentifierSeparator.js --identifierSeparator=/ |
node Processors/orderItemsByType --typesInOrder= --typesInOrder=parameter --typesInOrder=variable --typesInOrder=file |
node Processors/stackRootItems.js --levels=harness --levels=Analyzers/JavaScript,Processors,Renderer --levels=callWhenProcessEntryPoint,createStackFromParsedYaml,Harnesses,Tests > dogfooding.output/.yaml

cat dogfooding.output/.yaml | node Renderer/getSvgForYaml.js > dogfooding.output/.svg