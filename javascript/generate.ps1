$ErrorActionPreference = "Stop"
$PSDefaultParameterValues['Out-File:Encoding'] = "utf8"

try
{
	Push-Location

	$identifierSeparator="\"
	$outputDirectory = "$PSScriptRoot\output"
	$replaceIdentifiers = "node_modules/@devsnicket/eunice-processors/replaceIdentifiers/bin.js"
	$rootDirectory = "$PSScriptRoot\.."

	function ensureDirectoryExists() {
		if (!(test-path $args[0]))
		{
			New-Item -ItemType Directory -Force -Path $args[0] | Out-Null
		}
	}

	function installEuniceNpmPackage() {
		npm install --no-save @devsnicket/eunice-$($args[0])
	}

	function removeIdentifierSuffix {
		$yamlDirectory=$args[0]
	
		# can't use npx or node_modules/.bin as there is a pipe character in the regular expression
		cat $yamlDirectory/analysis.yaml `
		| node $replaceIdentifiers `
		--pattern="\${identifierSeparator}index$|^index" `
		--replacement= `
		> $yamlDirectory/remove-identifier-suffix-of-index.yaml
	}

	function processYamlFile {
		$yamlDirectory = Split-Path $args[0]

		cat $args[0] `
		| npx eunice-processors-setTypeOfRootItems `
			--type=file `
		> $yamlDirectory/set-type-of-root-items-to-file.yaml

		cat $yamlDirectory/set-type-of-root-items-to-file.yaml `
		| npx eunice-processors-orderItemsByIdentifier `
		> $yamlDirectory/order-items-by-identifier.yaml

		cat $yamlDirectory/order-items-by-identifier.yaml `
		| npx eunice-processors-groupItemsByIdentifierSeparator `
			--identifierSeparator=$identifierSeparator `
		> $yamlDirectory/group-items-by-identifier-separator-of-slash.yaml

		cat $yamlDirectory/group-items-by-identifier-separator-of-slash.yaml `
		| npx eunice-processors-removeRedundantParentIdentifierPrefix `
			--identifierSeparator=$identifierSeparator `
		> $yamlDirectory/remove-redundant-parent-identifier-prefix-of-slash.yaml

		cat $yamlDirectory/remove-redundant-parent-identifier-prefix-of-slash.yaml `
		| npx eunice-processors-setIdentifierOfAnonymousToParent `
			--identifierSeparator=$identifierSeparator `
		> $yamlDirectory/set-identifier-of-anonymous-to-parent.yaml

		cat $yamlDirectory/set-identifier-of-anonymous-to-parent.yaml `
		| npx eunice-processors-removeSelfDependentItemsOfType `
			--type=variable `
		> $yamlDirectory/remove-self-dependent-items-of-type-variable.yaml

		cat $yamlDirectory/remove-self-dependent-items-of-type-variable.yaml `
		| npx eunice-processors-orderItemsByIndexOfType `
			--typesInOrder= --typesInOrder=parameter --typesInOrder=variable --typesInOrder=file `
		> $yamlDirectory/order-items-by-index-of-type.yaml

		cat $yamlDirectory/order-items-by-index-of-type.yaml `
		| npx eunice-processors-createOrAddToStacksUniformly `
			--commaSeparatedLevels=bin,test --commaSeparatedLevels=existing `
		> $yamlDirectory/stack-test-in-top-level.yaml

		cat $yamlDirectory/stack-test-in-top-level.yaml `
		| npx eunice-processors-createOrAddToStacksToItemsWithIdentifier `
			--commaSeparatedLevels=existing --commaSeparatedLevels=expect,test `
			--toIdentifier=test `
		> $yamlDirectory/add-to-stack-test-identifiers.yaml

		cat $yamlDirectory/add-to-stack-test-identifiers.yaml `
		| npx eunice-processors-unstackIndependent `
		> $yamlDirectory/unstack-independent.yaml

		cat -Path $yamlDirectory/unstack-independent.yaml `
		| % {$_ -replace "'@devsnicket/eunice-$($packages[0])'", $packages[0] } `
		| % {$_ -replace "'@devsnicket/eunice-$($packages[1])'", $packages[1] } `
		| % {$_ -replace "'@devsnicket/eunice-$($packages[2])'", $packages[2] } `
		| % {$_ -replace "'@devsnicket/eunice-$($packages[3])'", $packages[3] } `
		| % {$_ -replace "'@devsnicket/eunice-$($packages[4])'", $packages[4] } `
		| % {$_ -replace "'@devsnicket/eunice-$($packages[5])'", $packages[5] } `
		| % {$_ -replace "'@devsnicket/eunice-$($packages[6])'", $packages[6] } `
		| % {$_ -replace "'@devsnicket/eunice-$($packages[7])'", $packages[7] } `
		> $yamlDirectory/without-package-prefixes.yaml
	}

	ensureDirectoryExists $outputDirectory

	cd $outputDirectory

	installEuniceNpmPackage "javascript-analyzer"
	installEuniceNpmPackage "processors"

	$packages = "call-with-process-standard-streams", "dependency-and-structure", "javascript-analyzer", "processors", "renderer", "run-tests-from-file-system", "test-harnesses", " test-harnesses-processor-plugins"

	echo "Analyze and process repository"

	ensureDirectoryExists repository

	npx eunice-javascript-analyzer-getOrCreateItemsInDirectory `
		--directory=$rootDirectory `
		--ignoreDirectoryNames=node_modules `
		--ignoreDirectoryNames=output `
	> repository/analysis.yaml

	removeIdentifierSuffix repository

	processYamlFile repository/remove-identifier-suffix-of-index.yaml

	foreach ($package in $packages)
	{
		echo "Analyze and process package $package"

		installEuniceNpmPackage $package

		ensureDirectoryExists $package

		npx eunice-javascript-analyzer-getOrCreateItemsInDirectory `
			--directory=node_modules/@devsnicket/eunice-$package `
			--ignoreDirectoryNames=.devsnicket-plugin-discovery `
			--ignoreDirectoryNames=dist `
			--ignoreDirectoryNames=node_modules `
			--ignoreDirectoryNames=test-cases `
		> $package/analysis.yaml

		removeIdentifierSuffix $package

		# can't use npx or node_modules/.bin as there is an ampersand character in the regular expression
		cat $package/remove-identifier-suffix-of-index.yaml `
		| node $replaceIdentifiers `
			--pattern=.+ `
			--replacement="$package$identifierSeparator$&" `
			--rootOnly=true `
		| node $replaceIdentifiers `
			--pattern=^$ `
			--replacement=$package `
			--rootOnly=true `
		> $package/with-root-prefix.yaml

		processYamlFile $package/with-root-prefix.yaml

		cat $package/without-package-prefixes.yaml `
		| npx eunice-processors-createOrAddToStacksUsingFileSystem `
			--directory=node_modules/@devsnicket/eunice-$package `
			--subsetIdentifierHierarchy=$package `
		> $package/stack-using-files.yaml
	}

	npx eunice-processors-concatenateFromFileSystem `
		--files repository/without-package-prefixes.yaml `
		--files "$($packages[0])/stack-using-files.yaml" `
		--files "$($packages[1])/stack-using-files.yaml" `
		--files "$($packages[2])/stack-using-files.yaml" `
		--files "$($packages[3])/stack-using-files.yaml" `
		--files "$($packages[4])/stack-using-files.yaml" `
		--files "$($packages[5])/stack-using-files.yaml" `
		--files "$($packages[6])/stack-using-files.yaml" `
		--files "$($packages[7])/stack-using-files.yaml" `
	> concatenate.yaml

	cat concatenate.yaml `
	| npx eunice-processors-createOrAddToStacksUsingFileSystem `
		--directory=$rootDirectory `
	> .yaml

	cat .yaml `
	| npx eunice-renderer `
	> .svg
}
finally
{
	Pop-Location
}