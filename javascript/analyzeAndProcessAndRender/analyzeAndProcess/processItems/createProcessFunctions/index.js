// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { createOrAddToStacksUsingFileSystem } from "@devsnicket/eunice-stacks-explicit";
import createSubsetIdentifierHierarchy from "./createSubsetIdentifierHierarchy";
import inferStacks from "./inferStacks";
import modifyStacksWithFile from "./modifyStacksWithFile";
import removeEmptySelfDependentOfType from "./removeEmptySelfDependentOfType";
import removePackagePrefixAndScopeInDependsUpon from "./removePackagePrefixAndScopeInDependsUpon";
import setDependencyPermeable from "./setDependencyPermeable";
import setIdentifierOfAnonymousExportToParent from "./setIdentifierOfAnonymousExportToParent";
import unstackIndependent from "./unstackIndependent";

export default ({
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