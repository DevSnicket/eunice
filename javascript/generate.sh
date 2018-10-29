#!/bin/bash
set -e

rootDirectory=$(dirname $0)/..
outputDirectory=$(dirname $0)/output

if [ ! -d $outputDirectory ]; then
	mkdir $outputDirectory
fi

# analyze this repository

node $rootDirectory/javascript-analyzer/getOrCreateItemsInDirectory \
  --directory=$rootDirectory \
  --ignoreDirectoryNames=coverage --ignoreDirectoryNames=node_modules --ignoreDirectoryNames=output --ignoreDirectoryNames=test-cases --ignoreDirectoryNames=test-coverage \
> $outputDirectory/analysis.yaml

sed -e \
  "s/'@devsnicket\/eunice-run-tests-from-file-system'/run-tests-from-file-system/g" \
  $outputDirectory/analysis.yaml \
> $outputDirectory/analysis-without-prefix.yaml

# analyze run-tests-from-file-system package

npm install --prefix $outputDirectory @devsnicket/eunice-run-tests-from-file-system

node $rootDirectory/javascript-analyzer/getOrCreateItemsInDirectory \
  --directory=$outputDirectory/node_modules/@devsnicket/eunice-run-tests-from-file-system \
> $outputDirectory/run-tests-from-file-system.yaml

sed -e \
  's/^- id: /- id: run-tests-from-file-system\//g' \
  $outputDirectory/run-tests-from-file-system.yaml \
> $outputDirectory/run-tests-from-file-system-with-prefix.yaml

# process and render this repository and packages

( \
  cat $outputDirectory/analysis-without-prefix.yaml \
  &&
  cat $outputDirectory/run-tests-from-file-system-with-prefix.yaml \
) \
| node $rootDirectory/Processors/setTypeOfRootItems \
  --type=file \
> $outputDirectory/setTypeOfRootItemsToFile.yaml

cat $outputDirectory/setTypeOfRootItemsToFile.yaml \
| node $rootDirectory/Processors/removeIdentifierSuffix \
  --suffix=/index \
> $outputDirectory/removeIdentifierSuffixOfIndex.yaml

cat $outputDirectory/removeIdentifierSuffixOfIndex.yaml \
| node $rootDirectory/Processors/orderItemsBy/identifier \
> $outputDirectory/orderItemsByIdentifier.yaml

cat $outputDirectory/orderItemsByIdentifier.yaml \
| node $rootDirectory/Processors/groupItemsByIdentifierSeparator \
  --identifierSeparator=/ \
> $outputDirectory/groupItemsByIdentifierSeparatorOfSlash.yaml

cat $outputDirectory/groupItemsByIdentifierSeparatorOfSlash.yaml \
| node $rootDirectory/Processors/removeRedundantParentIdentifierPrefix \
  --identifierSeparator=/ \
> $outputDirectory/removeRedundantParentIdentifierPrefixOfSlash.yaml

cat $outputDirectory/removeRedundantParentIdentifierPrefixOfSlash.yaml \
| node $rootDirectory/Processors/removeSelfDependentItemsOfType \
  --type=variable \
> $outputDirectory/removeSelfDependentItemsOfTypeVariable.yaml

cat $outputDirectory/removeSelfDependentItemsOfTypeVariable.yaml \
| node $rootDirectory/Processors/orderItemsBy/indexOf/type \
  --typesInOrder= --typesInOrder=parameter --typesInOrder=variable --typesInOrder=file \
> $outputDirectory/orderItemsByIndexOfType.yaml

cat $outputDirectory/orderItemsByIndexOfType.yaml \
| node $rootDirectory/Processors/createOrAddToStacks/uniformly \
  --commaSeparatedLevels=test --commaSeparatedLevels=existing \
> $outputDirectory/createOrAddToStacksStackUniformlyForTest.yaml

cat $outputDirectory/createOrAddToStacksStackUniformlyForTest.yaml \
| node $rootDirectory/Processors/createOrAddToStacks/toItemsWithIdentifier \
  --commaSeparatedLevels=existing --commaSeparatedLevels=expect,test \
  --toIdentifier=test \
> $outputDirectory/createOrAddToStacksStackToItemsWithIdentifierOfTest.yaml

cat $outputDirectory/createOrAddToStacksStackToItemsWithIdentifierOfTest.yaml \
| node $rootDirectory/Processors/createOrAddToStacks/usingFileSystem \
  --directory=$rootDirectory \
> $outputDirectory/createOrAddToStacksStackUsingFileSystemInRepository.yaml

cat $outputDirectory/createOrAddToStacksStackUsingFileSystemInRepository.yaml \
| node $rootDirectory/Processors/createOrAddToStacks/usingFileSystem \
   --directory=$outputDirectory/node_modules/@devsnicket/eunice-run-tests-from-file-system \
   --subsetIdentifierHierarchy=run-tests-from-file-system \
> $outputDirectory/createOrAddToStacksStackUsingFileSystemInRunTestsFromFileSystemPackage.yaml

cat $outputDirectory/createOrAddToStacksStackUsingFileSystemInRunTestsFromFileSystemPackage.yaml \
| node $rootDirectory/Processors/unstackIndependent \
> $outputDirectory/.yaml

cat $outputDirectory/.yaml \
| node $rootDirectory/Renderer/getSvgForYaml \
> $outputDirectory/.svg