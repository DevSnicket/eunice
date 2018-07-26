#!/bin/bash
mkdir dogfooding.output

node Analyzers/JavaScript/getOrCreateItemsInDirectory.js --directory=. --ignoreDirectoryNames=Coverage --ignoreDirectoryNames=getOrCreateItemsInDirectory.testcases --ignoreDirectoryNames=getYamlFromJavaScript.testcases --ignoreDirectoryNames=node_modules --ignoreDirectoryNames=Output | 
node Processors/setTypeOfRootItems.js --type=file |
node Processors/groupItemsByIdentifierSeparator.js --identifierSeparator=/ |
node Processors/orderItemsByType --typesInOrder= --typesInOrder=parameter --typesInOrder=variable --typesInOrder=file |
node Processors/stackRootItems.js --levels=harness --levels=Analyzers/JavaScript,Processors,Renderer --levels=Tests/runTestsInFileSystem,callWhenProcessEntryPoint,Harnesses > dogfooding.output/.yaml

node Renderer/getSvgForYaml.test.js ./dogfooding.output/.yaml > dogfooding.output/.svg