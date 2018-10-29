#!/bin/bash
set -e

outputDirectory=$(dirname $0)/output

if [ ! -d $outputDirectory ]; then
	mkdir $outputDirectory
fi

# analyze this repository

node javascript-analyzer/getOrCreateItemsInDirectory \
  --directory=. \
  --ignoreDirectoryNames=coverage --ignoreDirectoryNames=node_modules --ignoreDirectoryNames=output --ignoreDirectoryNames=test-cases --ignoreDirectoryNames=test-coverage \
> $outputDirectory/analysis.yaml

sed -e \
  "s/'@devsnicket\/eunice-run-tests-from-file-system'/run-tests-from-file-system/g" \
  $outputDirectory/analysis.yaml \
> $outputDirectory/analysis-without-prefix.yaml

# analyze run-tests-from-file-system package

npm install --prefix $outputDirectory @devsnicket/eunice-run-tests-from-file-system

node javascript-analyzer/getOrCreateItemsInDirectory \
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
| node Processors/setTypeOfRootItems \
  --type=file \
> $outputDirectory/setTypeOfRootItemsToFile.yaml

cat $outputDirectory/setTypeOfRootItemsToFile.yaml \
| node Processors/removeIdentifierSuffix \
  --suffix=/index \
> $outputDirectory/removeIdentifierSuffixOfIndex.yaml

cat $outputDirectory/removeIdentifierSuffixOfIndex.yaml \
| node Processors/orderItemsBy/identifier \
> $outputDirectory/orderItemsByIdentifier.yaml

cat $outputDirectory/orderItemsByIdentifier.yaml \
| node Processors/groupItemsByIdentifierSeparator \
  --identifierSeparator=/ \
> $outputDirectory/groupItemsByIdentifierSeparatorOfSlash.yaml

cat $outputDirectory/groupItemsByIdentifierSeparatorOfSlash.yaml \
| node Processors/removeRedundantParentIdentifierPrefix \
  --identifierSeparator=/ \
> $outputDirectory/removeRedundantParentIdentifierPrefixOfSlash.yaml

cat $outputDirectory/removeRedundantParentIdentifierPrefixOfSlash.yaml \
| node Processors/removeSelfDependentItemsOfType \
  --type=variable \
> $outputDirectory/removeSelfDependentItemsOfTypeVariable.yaml

cat $outputDirectory/removeSelfDependentItemsOfTypeVariable.yaml \
| node Processors/orderItemsBy/indexOf/type \
  --typesInOrder= --typesInOrder=parameter --typesInOrder=variable --typesInOrder=file \
> $outputDirectory/orderItemsByIndexOfType.yaml

cat $outputDirectory/orderItemsByIndexOfType.yaml \
| node Processors/createOrAddToStacks/uniformly \
  --commaSeparatedLevels=test --commaSeparatedLevels=existing \
> $outputDirectory/createOrAddToStacksStackUniformlyForTest.yaml

cat $outputDirectory/createOrAddToStacksStackUniformlyForTest.yaml \
| node Processors/createOrAddToStacks/toItemsWithIdentifier \
  --commaSeparatedLevels=existing --commaSeparatedLevels=expect,test \
  --toIdentifier=test \
> $outputDirectory/createOrAddToStacksStackToItemsWithIdentifierOfTest.yaml

cat $outputDirectory/createOrAddToStacksStackToItemsWithIdentifierOfTest.yaml \
| node Processors/createOrAddToStacks/usingFileSystem \
  --directory=$(dirname $0)/.. \
> $outputDirectory/createOrAddToStacksStackUsingFileSystemInRepository.yaml

cat $outputDirectory/createOrAddToStacksStackUsingFileSystemInRepository.yaml \
| node Processors/createOrAddToStacks/usingFileSystem \
   --directory=$outputDirectory/node_modules/@devsnicket/eunice-run-tests-from-file-system \
   --subsetIdentifierHierarchy=run-tests-from-file-system \
> $outputDirectory/createOrAddToStacksStackUsingFileSystemInRunTestsFromFileSystemPackage.yaml

cat $outputDirectory/createOrAddToStacksStackUsingFileSystemInRunTestsFromFileSystemPackage.yaml \
| node Processors/unstackIndependent \
> $outputDirectory/.yaml

cat $outputDirectory/.yaml \
| node Renderer/getSvgForYaml \
> $outputDirectory/.svg