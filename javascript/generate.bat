@echo off

set outputDirectory=%~dp0output

mkdir %outputDirectory%

node Analyzer/getOrCreateItemsInDirectory ^
  --directory=. ^
  --ignoreDirectoryNames=Coverage --ignoreDirectoryNames=testcases --ignoreDirectoryNames=node_modules --ignoreDirectoryNames=output > ^
%outputDirectory%\analysis.yaml

type %outputDirectory%\analysis.yaml | ^
node Processors/setTypeOfRootItems ^
  --type=file > ^
%outputDirectory%\setTypeOfRootItemsToFile.yaml

type %outputDirectory%\setTypeOfRootItemsToFile.yaml | ^
node Processors/removeIdentifierSuffix ^
  --suffix=\index > ^
%outputDirectory%\removeIdentifierSuffixOfIndex.yaml

type %outputDirectory%\removeIdentifierSuffixOfIndex.yaml | ^
node Processors/orderItemsBy/identifier > ^
%outputDirectory%\orderItemsByIdentifier.yaml

type %outputDirectory%\orderItemsByIdentifier.yaml | ^
node Processors/groupItemsByIdentifierSeparator ^
  --identifierSeparator=\ > ^
%outputDirectory%\groupItemsByIdentifierSeparatorOfSlash.yaml

type %outputDirectory%\groupItemsByIdentifierSeparatorOfSlash.yaml | ^
node Processors/removeRedundantParentIdentifierPrefix ^
  --identifierSeparator=\ > ^
%outputDirectory%\removeRedundantParentIdentifierPrefixOfSlash.yaml

type %outputDirectory%\removeRedundantParentIdentifierPrefixOfSlash.yaml | ^
node Processors/removeSelfDependentItemsOfType ^
  --type=variable > ^
%outputDirectory%\removeSelfDependentItemsOfTypeVariable.yaml

type %outputDirectory%\removeSelfDependentItemsOfTypeVariable.yaml | ^
node Processors/orderItemsBy/indexOf/type ^
  --typesInOrder= --typesInOrder=parameter --typesInOrder=variable --typesInOrder=file > ^
%outputDirectory%\orderItemsByIndexOfType.yaml

type %outputDirectory%\orderItemsByIndexOfType.yaml | ^
node Processors/createOrAddToStacks/uniformly ^
  --commaSeparatedLevels=test --commaSeparatedLevels=existing > ^
%outputDirectory%\createOrAddToStacksStackUniformlyForTest.yaml

type %outputDirectory%\createOrAddToStacksStackUniformlyForTest.yaml | ^
node Processors/createOrAddToStacks/toItemsWithIdentifier ^
  --commaSeparatedLevels=existing --commaSeparatedLevels=expect,test ^
  --toIdentifier=test > ^
%outputDirectory%\createOrAddToStacksStackToItemsWithIdentifierOfTest.yaml

type %outputDirectory%\createOrAddToStacksStackToItemsWithIdentifierOfTest.yaml | ^
node Processors/createOrAddToStacks/usingFileSystem ^
  --directory=%~dp0.. > ^
%outputDirectory%\createOrAddToStacksStackUsingFileSystem.yaml

type %outputDirectory%\createOrAddToStacksStackUsingFileSystem.yaml | ^
node Processors/unstackIndependent > ^
%outputDirectory%\.yaml

type %outputDirectory%\.yaml | ^
node Renderer/getSvgForYaml > ^
%outputDirectory%\.svg