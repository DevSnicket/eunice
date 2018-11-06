$ErrorActionPreference = "Stop"
$PSDefaultParameterValues['Out-File:Encoding'] = "utf8"


$identifierSeparator="\"
$rootDirectory = join-path $PSScriptRoot ".."
$outputDirectory = join-path $PSScriptRoot "output"

function ensureDirectoryExists() {
	if (!(test-path $args[0]))
	{
		New-Item -ItemType Directory -Force -Path $args[0] | Out-Null
	}
}

ensureDirectoryExists outputDirectory

function processInDirectory {
	$yamlDirectory = $args[0]

	cat $yamlDirectory/analysis.yaml `
	| node $rootDirectory/Processors/setTypeOfRootItems `
		--type=file `
	> $yamlDirectory/set-type-of-root-items-to-file.yaml

	cat $yamlDirectory/set-type-of-root-items-to-file.yaml `
	| node $rootDirectory/Processors/replaceIdentifiers `
		--pattern="\${identifierSeparator}index$|^index" `
		--replacement= `
	> $yamlDirectory/remove-identifier-suffix-of-index.yaml

	cat $yamlDirectory/remove-identifier-suffix-of-index.yaml `
	| node $rootDirectory/Processors/orderItemsBy/identifier `
	> $yamlDirectory/order-items-by-identifier.yaml

	cat $yamlDirectory/order-items-by-identifier.yaml `
	| node $rootDirectory/Processors/groupItemsByIdentifierSeparator `
		--identifierSeparator=$identifierSeparator `
	> $yamlDirectory/group-items-by-identifier-separator-of-slash.yaml

	cat $yamlDirectory/group-items-by-identifier-separator-of-slash.yaml `
	| node $rootDirectory/Processors/removeRedundantParentIdentifierPrefix `
		--identifierSeparator=$identifierSeparator `
	> $yamlDirectory/remove-redundant-parent-identifier-prefix-of-slash.yaml

	cat $yamlDirectory/remove-redundant-parent-identifier-prefix-of-slash.yaml `
	| node $rootDirectory/Processors/removeSelfDependentItemsOfType `
		--type=variable `
	> $yamlDirectory/remove-self-dependent-items-of-type-variable.yaml

	cat $yamlDirectory/remove-self-dependent-items-of-type-variable.yaml `
	| node $rootDirectory/Processors/orderItemsBy/indexOf/type `
		--typesInOrder= --typesInOrder=parameter --typesInOrder=variable --typesInOrder=file `
	> $yamlDirectory/order-items-by-index-of-type.yaml

	cat $yamlDirectory/order-items-by-index-of-type.yaml `
	| node $rootDirectory/Processors/createOrAddToStacks/uniformly `
		--commaSeparatedLevels=test --commaSeparatedLevels=existing `
	> $yamlDirectory/stack-test-in-top-level.yaml

	cat $yamlDirectory/stack-test-in-top-level.yaml `
	| node $rootDirectory/Processors/createOrAddToStacks/toItemsWithIdentifier `
		--commaSeparatedLevels=existing --commaSeparatedLevels=expect,test `
		--toIdentifier=test `
	> $yamlDirectory/add-to-stack-test-identifiers.yaml

	cat $yamlDirectory/add-to-stack-test-identifiers.yaml `
	| node $rootDirectory/Processors/unstackIndependent `
	> $yamlDirectory/unstack-independent.yaml
}

$packages = "call-when-process-entry-point", "dependency-and-structure", "run-tests-from-file-system"

# repository

ensureDirectoryExists $outputDirectory/repository

node $rootDirectory/javascript-analyzer/getOrCreateItemsInDirectory `
	--directory=$rootDirectory `
	--ignoreDirectoryNames=coverage --ignoreDirectoryNames=node_modules --ignoreDirectoryNames=output --ignoreDirectoryNames=test-cases --ignoreDirectoryNames=test-coverage `
> $outputDirectory/repository/analysis.yaml

processInDirectory $outputDirectory/repository

cat -Path $outputDirectory/repository/unstack-independent.yaml `
| % {$_ -replace "'@devsnicket/eunice-$($packages[0])'", $packages[0] } `
| % {$_ -replace "'@devsnicket/eunice-$($packages[1])'", $packages[1] } `
| % {$_ -replace "'@devsnicket/eunice-$($packages[2])'", $packages[2] } `
> $outputDirectory/repository/without-package-prefixes.yaml

# packages

foreach ($package in $packages)
{
	npm install --no-save --prefix $outputDirectory @devsnicket/eunice-$package

	ensureDirectoryExists $outputDirectory/$package

	node $rootDirectory/javascript-analyzer/getOrCreateItemsInDirectory `
		--directory=$outputDirectory/node_modules/@devsnicket/eunice-$package `
		--ignoreDirectoryNames=dist `
		--ignoreDirectoryNames=node_modules `
	> $outputDirectory/$package/analysis.yaml

	processInDirectory $outputDirectory/$package

	cat $outputDirectory/$package/unstack-independent.yaml `
	| node $rootDirectory/Processors/createOrAddToStacks/usingFileSystem `
		--directory=$outputDirectory/node_modules/@devsnicket/eunice-$package `
		--subsetIdentifierHierarchy= `
	> $outputDirectory/$package/stack-using-files.yaml

	cat $outputDirectory/$package/stack-using-files.yaml `
	| node $rootDirectory/Processors/replaceIdentifiers `
		--pattern=.+ `
		--replacement="$package$identifierSeparator$&" `
		--rootOnly=true `
	| node $rootDirectory/Processors/replaceIdentifiers `
		--pattern=^$ `
		--replacement=$package `
		--rootOnly=true `
	> $outputDirectory/$package/with-root-prefix.yaml
}

node $rootDirectory/Processors/concatenateFromFileSystem `
	--files $outputDirectory/repository/without-package-prefixes.yaml `
	--files $outputDirectory/$($packages[0])/with-root-prefix.yaml `
	--files $outputDirectory/$($packages[1])/with-root-prefix.yaml `
	--files $outputDirectory/$($packages[2])/with-root-prefix.yaml `
> $outputDirectory/concatenate.yaml

cat $outputDirectory/concatenate.yaml `
| node $rootDirectory/Processors/createOrAddToStacks/usingFileSystem `
	--directory=$rootDirectory `
> $outputDirectory/.yaml

cat $outputDirectory/.yaml `
| node $rootDirectory/Renderer/getSvgForYaml `
> $outputDirectory/.svg