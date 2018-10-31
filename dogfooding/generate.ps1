$ErrorActionPreference = "Stop"

$rootDirectory = "$PSScriptRoot\.."
$outputDirectory = "$PSScriptRoot\output"

if (!(test-path $outputDirectory))
{
      New-Item -ItemType Directory -Force -Path $outputDirectory
}

# analyze this repository

node $rootDirectory/javascript-analyzer/getOrCreateItemsInDirectory `
  --directory=$rootDirectory `
  --ignoreDirectoryNames=coverage --ignoreDirectoryNames=node_modules --ignoreDirectoryNames=output --ignoreDirectoryNames=test-cases --ignoreDirectoryNames=test-coverage `
> $outputDirectory/analysis-of-repository.yaml

# analyze run-tests-from-file-system package

$packages = "call-when-process-entry-point", "dependency-and-structure", "run-tests-from-file-system"

cat -Path $outputDirectory/analysis-of-repository.yaml `
| % {$_ -replace "'@devsnicket/eunice-$($packages[0])'", $packages[0] } `
| % {$_ -replace "'@devsnicket/eunice-$($packages[1])'", $packages[1] } `
| % {$_ -replace "'@devsnicket/eunice-$($packages[2])'", $packages[2] } `
> $outputDirectory/analysis-of-repository-without-package-prefixes.yaml

foreach ($package in $packages) 
{
	npm install --no-save --prefix $outputDirectory @devsnicket/eunice-$package

	node $rootDirectory/javascript-analyzer/getOrCreateItemsInDirectory `
		--directory=$outputDirectory/node_modules/@devsnicket/eunice-$package `
		--ignoreDirectoryNames=dist `
		--ignoreDirectoryNames=node_modules `
 		> $outputDirectory/analysis-of-package-$package.yaml

	cat $outputDirectory/analysis-of-package-$package.yaml `
	| % {$_ -replace "^- id: ", "- id: $package\" } `
	| % {$_ -replace "^- (?!id: )", "- $package\" } `
	> $outputDirectory/analysis-of-package-$package-with-root-prefix.yaml
}

# process and render this repository and packages

cat `
	$outputDirectory/analysis-of-repository-without-package-prefixes.yaml, `
	$outputDirectory/analysis-of-package-$($packages[0])-with-root-prefix.yaml, `
	$outputDirectory/analysis-of-package-$($packages[1])-with-root-prefix.yaml, `
	$outputDirectory/analysis-of-package-$($packages[2])-with-root-prefix.yaml `
| node $rootDirectory/Processors/setTypeOfRootItems `
	--type=file `
> $outputDirectory/set-type-of-root-items-to-file.yaml

cat $outputDirectory/set-type-of-root-items-to-file.yaml `
| node $rootDirectory/Processors/removeIdentifierSuffix `
	--suffix=\index `
> $outputDirectory/remove-identifier-suffix-of-index.yaml

cat $outputDirectory/remove-identifier-suffix-of-index.yaml `
| node $rootDirectory/Processors/orderItemsBy/identifier `
> $outputDirectory/order-items-by-identifier.yaml

cat $outputDirectory/order-items-by-identifier.yaml `
| node $rootDirectory/Processors/groupItemsByIdentifierSeparator `
	--identifierSeparator=\ `
> $outputDirectory/group-items-by-identifier-separator-of-slash.yaml

cat $outputDirectory/group-items-by-identifier-separator-of-slash.yaml `
| node $rootDirectory/Processors/removeRedundantParentIdentifierPrefix `
	--identifierSeparator=\ `
> $outputDirectory/remove-redundant-parent-identifier-prefix-of-slash.yaml

cat $outputDirectory/remove-redundant-parent-identifier-prefix-of-slash.yaml `
| node $rootDirectory/Processors/removeSelfDependentItemsOfType `
  --type=variable `
> $outputDirectory/remove-self-dependent-items-of-type-variable.yaml

cat $outputDirectory/remove-self-dependent-items-of-type-variable.yaml `
| node $rootDirectory/Processors/orderItemsBy/indexOf/type `
  --typesInOrder= --typesInOrder=parameter --typesInOrder=variable --typesInOrder=file `
> $outputDirectory/order-items-by-index-of-type.yaml

cat $outputDirectory/order-items-by-index-of-type.yaml `
| node $rootDirectory/Processors/createOrAddToStacks/uniformly `
  --commaSeparatedLevels=test --commaSeparatedLevels=existing `
> $outputDirectory/stack-test-in-top-level.yaml

cat $outputDirectory/stack-test-in-top-level.yaml `
| node $rootDirectory/Processors/createOrAddToStacks/toItemsWithIdentifier `
  --commaSeparatedLevels=existing --commaSeparatedLevels=expect,test `
  --toIdentifier=test `
> $outputDirectory/add-to-stack-test-identifiers.yaml

cat $outputDirectory/add-to-stack-test-identifiers.yaml `
| node $rootDirectory/Processors/createOrAddToStacks/usingFileSystem `
  --directory=$rootDirectory `
> $outputDirectory/stack-using-files-in-repository.yaml

$lastStackUsingFiles = "repository"

foreach ($package in $packages) 
{
	cat $outputDirectory/stack-using-files-in-$lastStackUsingFiles.yaml `
	| node $rootDirectory/Processors/createOrAddToStacks/usingFileSystem `
		--directory=$outputDirectory/node_modules/@devsnicket/eunice-$package `
		--subsetIdentifierHierarchy=$package `
	> $outputDirectory/stack-using-files-in-$package.yaml

	$lastStackUsingFiles=$package
}

cat $outputDirectory/stack-using-files-in-$lastStackUsingFiles.yaml `
| node $rootDirectory/Processors/unstackIndependent `
> $outputDirectory/.yaml

cat $outputDirectory/.yaml `
| node $rootDirectory/Renderer/getSvgForYaml `
> $outputDirectory/.svg