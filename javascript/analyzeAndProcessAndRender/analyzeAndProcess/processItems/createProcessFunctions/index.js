// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createSubsetIdentifierHierarchy = require("./createSubsetIdentifierHierarchy"),
	inferStacks = require("./inferStacks"),
	modifyStacksWithFile = require("./modifyStacksWithFile"),
	removeEmptySelfDependentOfType = require("./removeEmptySelfDependentOfType"),
	removePackagePrefixAndScopeInDependsUpon = require("./removePackagePrefixAndScopeInDependsUpon"),
	{ stacking: { createOrAddToStacksUsingFileSystem } } = require("@devsnicket/eunice-processors"),
	setDependencyPermeable = require("./setDependencyPermeable"),
	setIdentifierOfAnonymousExportToParent = require("./setIdentifierOfAnonymousExportToParent"),
	unstackIndependent = require("./unstackIndependent");

module.exports =
	({
		dependencyPermeableIdentifiers,
		directoryToCreateOrAddToStacksFrom,
		isInferStacksEnabled,
		modifyStacksFile,
		packagePrefixAndScope,
		rootItemIdentifier,
	}) =>
		[
			identifierOrItemOrLevelOrStack =>
				modifyStacksWithFile({
					...modifyStacksFile,
					identifierOrItemOrLevelOrStack,
				}),
			identifierOrItemOrLevelOrStack =>
				createOrAddToStacksUsingFileSystem({
					directory:
						directoryToCreateOrAddToStacksFrom,
					identifierOrItemOrLevelOrStack,
					subsetIdentifierHierarchy:
						createSubsetIdentifierHierarchy({
							identifierOrItemOrLevelOrStack,
							rootItemIdentifier,
						}),
				}),
			setIdentifierOfAnonymousExportToParent,
			identifierOrItemOrLevelOrStack =>
				removeEmptySelfDependentOfType({
					identifierOrItemOrLevelOrStack,
					types: [ "export", "import", "variable" ],
				}),
			unstackIndependent,
			identifierOrItemOrLevelOrStack =>
				removePackagePrefixAndScopeInDependsUpon({
					identifierOrItemOrLevelOrStack,
					...packagePrefixAndScope,
				}),
			identifierOrItemOrLevelOrStack =>
				setDependencyPermeable({
					dependencyPermeableIdentifiers,
					identifierOrItemOrLevelOrStack,
				}),
			identifierOrItemOrLevelOrStack =>
				isInferStacksEnabled
				?
				inferStacks(identifierOrItemOrLevelOrStack)
				:
				identifierOrItemOrLevelOrStack,
		];