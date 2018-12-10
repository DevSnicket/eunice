#!/bin/bash
set -e

identifierSeparator=/
rootDirectory=../..
processorsDirectory=node_modules/@devsnicket/eunice-processors

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
  | node $processorsDirectory/replaceIdentifiers \
    --pattern="${identifierSeparator}index$|^index" \
    --replacement= \
  > $yamlDirectory/remove-identifier-suffix-of-index.yaml
}

function processYamlFile {
  local yamlDirectory=$(dirname $1)

  cat $1 \
  | node $processorsDirectory/setTypeOfRootItems \
    --type=file \
  > $yamlDirectory/set-type-of-root-items-to-file.yaml

  cat $yamlDirectory/set-type-of-root-items-to-file.yaml \
  | node $processorsDirectory/orderItemsBy/identifier \
  > $yamlDirectory/order-items-by-identifier.yaml

  cat $yamlDirectory/order-items-by-identifier.yaml \
  | node $processorsDirectory/groupItemsByIdentifierSeparator \
    --identifierSeparator=$identifierSeparator \
  > $yamlDirectory/group-items-by-identifier-separator-of-slash.yaml

  cat $yamlDirectory/group-items-by-identifier-separator-of-slash.yaml \
  | node $processorsDirectory/removeRedundantParentIdentifierPrefix \
    --identifierSeparator=$identifierSeparator \
  > $yamlDirectory/remove-redundant-parent-identifier-prefix-of-slash.yaml

  cat $yamlDirectory/remove-redundant-parent-identifier-prefix-of-slash.yaml \
  | node $processorsDirectory/removeSelfDependentItemsOfType \
    --type=variable \
  > $yamlDirectory/remove-self-dependent-items-of-type-variable.yaml

  cat $yamlDirectory/remove-self-dependent-items-of-type-variable.yaml \
  | node $processorsDirectory/orderItemsBy/indexOf/type \
    --typesInOrder= --typesInOrder=parameter --typesInOrder=variable --typesInOrder=file \
  > $yamlDirectory/order-items-by-index-of-type.yaml

  cat $yamlDirectory/order-items-by-index-of-type.yaml \
  | node $processorsDirectory/createOrAddToStacks/uniformly \
    --commaSeparatedLevels=test --commaSeparatedLevels=existing \
  > $yamlDirectory/stack-test-in-top-level.yaml

  cat $yamlDirectory/stack-test-in-top-level.yaml \
  | node $processorsDirectory/createOrAddToStacks/toItemsWithIdentifier \
    --commaSeparatedLevels=existing --commaSeparatedLevels=expect,test \
    --toIdentifier=test \
  > $yamlDirectory/add-to-stack-test-identifiers.yaml
  
  cat $yamlDirectory/add-to-stack-test-identifiers.yaml \
  | node $processorsDirectory/unstackIndependent \
  > $yamlDirectory/unstack-independent.yaml

  sed \
    $yamlDirectory/unstack-independent.yaml \
    -e "s/'@devsnicket\/eunice-${packages[0]}'/${packages[0]}/g" \
    -e "s/'@devsnicket\/eunice-${packages[1]}'/${packages[1]}/g" \
    -e "s/'@devsnicket\/eunice-${packages[2]}'/${packages[2]}/g" \
    -e "s/'@devsnicket\/eunice-${packages[3]}'/${packages[3]}/g" \
    -e "s/'@devsnicket\/eunice-${packages[4]}'/${packages[4]}/g" \
    -e "s/'@devsnicket\/eunice-${packages[5]}'/${packages[5]}/g" \
    -e "s/'@devsnicket\/eunice-${packages[6]}'/${packages[6]}/g" \
  > $yamlDirectory/without-package-prefixes.yaml
}

outputDirectory=$(dirname $0)/output

ensureDirectoryExists $outputDirectory
cd $outputDirectory

installEuniceNpmPackage "javascript-analyzer"
installEuniceNpmPackage "processors"

packages=(call-when-process-entry-point dependency-and-structure javascript-analyzer processors renderer run-tests-from-file-system test-harnesses)

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

for package in ${packages[@]}; do
  echo Analyze and process package $package

  installEuniceNpmPackage $package

  ensureDirectoryExists $package

  npx @devsnicket/eunice-javascript-analyzer \
    --directory=node_modules/@devsnicket/eunice-$package \
    --ignoreDirectoryNames=.devsnicket-plugin-discovery \
    --ignoreDirectoryNames=dist \
    --ignoreDirectoryNames=node_modules \
    --ignoreDirectoryNames=test-cases \
  > $package/analysis.yaml

  removeIdentifierSuffix $package

  cat $package/remove-identifier-suffix-of-index.yaml \
	| node $processorsDirectory/replaceIdentifiers \
    --pattern=.+ \
    --replacement="$package$identifierSeparator$&" \
    --rootOnly=true \
	| node $processorsDirectory/replaceIdentifiers \
    --pattern=^$ \
    --replacement=$package \
    --rootOnly=true \
  > $package/with-root-prefix.yaml

  processYamlFile $package/with-root-prefix.yaml

  cat $package/without-package-prefixes.yaml \
  | node $processorsDirectory/createOrAddToStacks/usingFileSystem \
    --directory=node_modules/@devsnicket/eunice-$package \
    --subsetIdentifierHierarchy=$package \
  > $package/stack-using-files.yaml
done

echo Combine repository and package, and process

node $processorsDirectory/concatenateFromFileSystem \
  --files repository/without-package-prefixes.yaml \
  --files ${packages[0]}/stack-using-files.yaml \
  --files ${packages[1]}/stack-using-files.yaml \
  --files ${packages[2]}/stack-using-files.yaml \
  --files ${packages[3]}/stack-using-files.yaml \
  --files ${packages[4]}/stack-using-files.yaml \
  --files ${packages[5]}/stack-using-files.yaml \
  --files ${packages[6]}/stack-using-files.yaml \
> concatenate.yaml
  
cat concatenate.yaml \
| node $processorsDirectory/createOrAddToStacks/usingFileSystem \
  --directory=$rootDirectory \
> .yaml

cat .yaml \
| node node_modules/@devsnicket/eunice-renderer/getSvgForYaml \
> .svg