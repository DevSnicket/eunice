#!/bin/bash
outputDirectory=$(dirname $0)/output

mkdir $outputDirectory

node Analyzer/getOrCreateItemsInDirectory \
  --directory=. \
  --ignoreDirectoryNames=Coverage --ignoreDirectoryNames=testcases --ignoreDirectoryNames=node_modules --ignoreDirectoryNames=Output \
> $outputDirectory/analysis.yaml

cat $outputDirectory/analysis.yaml \
| node Processors/setTypeOfRootItems \
  --type=file \
> $outputDirectory/setTypeOfRootItemsToFile.yaml

cat $outputDirectory/setTypeOfRootItemsToFile.yaml \
| node Processors/removeIdentifierSuffix \
  --suffix=/index \
> $outputDirectory/removeIdentifierSuffixOfItem.yaml

cat $outputDirectory/removeIdentifierSuffixOfItem.yaml \
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
> $outputDirectory/createOrAddToStacksStackUsingFileSystem.yaml

cat $outputDirectory/createOrAddToStacksStackUsingFileSystem.yaml \
| node Processors/unstackIndependent \
> $outputDirectory/.yaml

cat $outputDirectory/.yaml \
| node Renderer/getSvgForYaml \
> $outputDirectory/.svg