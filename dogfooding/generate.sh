#!/bin/bash
set -e

identifierSeparator=/
rootDirectory=../..

function ensureDirectoryExists() {
  if [ ! -d $1 ]; then
    mkdir $1
  fi
}

function installEuniceNpmPackage() {
	npm install --no-save --prefix=. @devsnicket/eunice-$1
}

function removeIdentifierSuffix {
  local yamlDirectory=$1

  cat $yamlDirectory/analysis.yaml \
  | node $rootDirectory/Processors/replaceIdentifiers \
    --pattern="${identifierSeparator}index$|^index" \
    --replacement= \
  > $yamlDirectory/remove-identifier-suffix-of-index.yaml
}

function processYamlFile {
  local yamlDirectory=$(dirname $1)

  cat $1 \
  | node $rootDirectory/Processors/setTypeOfRootItems \
    --type=file \
  > $yamlDirectory/set-type-of-root-items-to-file.yaml

  cat $yamlDirectory/set-type-of-root-items-to-file.yaml \
  | node $rootDirectory/Processors/orderItemsBy/identifier \
  > $yamlDirectory/order-items-by-identifier.yaml

  cat $yamlDirectory/order-items-by-identifier.yaml \
  | node $rootDirectory/Processors/groupItemsByIdentifierSeparator \
    --identifierSeparator=$identifierSeparator \
  > $yamlDirectory/group-items-by-identifier-separator-of-slash.yaml

  cat $yamlDirectory/group-items-by-identifier-separator-of-slash.yaml \
  | node $rootDirectory/Processors/removeRedundantParentIdentifierPrefix \
    --identifierSeparator=$identifierSeparator \
  > $yamlDirectory/remove-redundant-parent-identifier-prefix-of-slash.yaml

  cat $yamlDirectory/remove-redundant-parent-identifier-prefix-of-slash.yaml \
  | node $rootDirectory/Processors/removeSelfDependentItemsOfType \
    --type=variable \
  > $yamlDirectory/remove-self-dependent-items-of-type-variable.yaml

  cat $yamlDirectory/remove-self-dependent-items-of-type-variable.yaml \
  | node $rootDirectory/Processors/orderItemsBy/indexOf/type \
    --typesInOrder= --typesInOrder=parameter --typesInOrder=variable --typesInOrder=file \
  > $yamlDirectory/order-items-by-index-of-type.yaml

  cat $yamlDirectory/order-items-by-index-of-type.yaml \
  | node $rootDirectory/Processors/createOrAddToStacks/uniformly \
    --commaSeparatedLevels=test --commaSeparatedLevels=existing \
  > $yamlDirectory/stack-test-in-top-level.yaml

  cat $yamlDirectory/stack-test-in-top-level.yaml \
  | node $rootDirectory/Processors/createOrAddToStacks/toItemsWithIdentifier \
    --commaSeparatedLevels=existing --commaSeparatedLevels=expect,test \
    --toIdentifier=test \
  > $yamlDirectory/add-to-stack-test-identifiers.yaml
  
  cat $yamlDirectory/add-to-stack-test-identifiers.yaml \
  | node $rootDirectory/Processors/unstackIndependent \
  > $yamlDirectory/unstack-independent.yaml
}

outputDirectory=$(dirname $0)/output

ensureDirectoryExists $outputDirectory
cd $outputDirectory

installEuniceNpmPackage "javascript-analyzer"

packages=(call-when-process-entry-point dependency-and-structure javascript-analyzer run-tests-from-file-system test-harnesses)

echo Analyze and process repository

ensureDirectoryExists repository

npx @devsnicket/eunice-javascript-analyzer \
  --directory=$rootDirectory \
  --ignoreDirectoryNames=coverage \
  --ignoreDirectoryNames=node_modules \
  --ignoreDirectoryNames=output \
  --ignoreDirectoryNames=test-cases \
  --ignoreDirectoryNames=test-coverage \
> repository/analysis.yaml

removeIdentifierSuffix repository

processYamlFile repository/remove-identifier-suffix-of-index.yaml

sed \
  repository/unstack-independent.yaml \
  -e "s/'@devsnicket\/eunice-${packages[0]}'/${packages[0]}/g" \
  -e "s/'@devsnicket\/eunice-${packages[1]}'/${packages[1]}/g" \
  -e "s/'@devsnicket\/eunice-${packages[2]}'/${packages[2]}/g" \
  -e "s/'@devsnicket\/eunice-${packages[3]}'/${packages[3]}/g" \
  -e "s/'@devsnicket\/eunice-${packages[4]}'/${packages[4]}/g" \
> repository/without-package-prefixes.yaml

for package in ${packages[@]}; do
  echo Analyze and process package $package

  installEuniceNpmPackage $package

  ensureDirectoryExists $package

  npx @devsnicket/eunice-javascript-analyzer \
    --directory=node_modules/@devsnicket/eunice-$package \
    --ignoreDirectoryNames=dist \
    --ignoreDirectoryNames=node_modules \
    --ignoreDirectoryNames=test-cases \
  > $package/analysis.yaml

  removeIdentifierSuffix $package

  cat $package/remove-identifier-suffix-of-index.yaml \
	| node $rootDirectory/Processors/replaceIdentifiers \
    --pattern=.+ \
    --replacement="$package$identifierSeparator$&" \
    --rootOnly=true \
	| node $rootDirectory/Processors/replaceIdentifiers \
    --pattern=^$ \
    --replacement=$package \
    --rootOnly=true \
  > $package/with-root-prefix.yaml

  processYamlFile $package/with-root-prefix.yaml

  cat $package/unstack-independent.yaml \
  | node $rootDirectory/Processors/createOrAddToStacks/usingFileSystem \
    --directory=node_modules/@devsnicket/eunice-$package \
    --subsetIdentifierHierarchy=$package \
  > $package/stack-using-files.yaml
done

echo Combine repository and package, and process

node $rootDirectory/Processors/concatenateFromFileSystem \
  --files repository/without-package-prefixes.yaml \
  --files ${packages[0]}/stack-using-files.yaml \
  --files ${packages[1]}/stack-using-files.yaml \
  --files ${packages[2]}/stack-using-files.yaml \
  --files ${packages[3]}/stack-using-files.yaml \
  --files ${packages[4]}/stack-using-files.yaml \
> concatenate.yaml
  
cat concatenate.yaml \
| node $rootDirectory/Processors/createOrAddToStacks/usingFileSystem \
  --directory=$rootDirectory \
> .yaml

cat .yaml \
| node $rootDirectory/Renderer/getSvgForYaml \
> .svg