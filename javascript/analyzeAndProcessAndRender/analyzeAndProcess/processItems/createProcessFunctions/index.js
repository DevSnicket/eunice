// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createIdentifierSeparatorSpecific = require("./createIdentifierSeparatorSpecific"),
	createSubsetIdentifierHierarchy = require("./createSubsetIdentifierHierarchy"),
	ensureRootItemWithIdentifier = require("./ensureRootItemWithIdentifier"),
	parseYaml = require("js-yaml").safeLoad,
	{ readFileSync } = require("fs"),
	removePackagePrefixAndScopeInDependsUpon = require("./removePackagePrefixAndScopeInDependsUpon"),
	{
		removeSelfDependentItemsOfType,
		replacement:
			{ replaceDependsUponWithHierarchyFromSeparator },
		sorting:
			{
				orderItemsByIdentifier,
				orderItemsByIndexOfType,
			},
		stacking:
			{
				createOrAddToStacksOfParentMatch,
				createOrAddToStacksUsingFileSystem,
			},
		setTypeOfRootItems,
		unstackIndependent,
	} = require("@devsnicket/eunice-processors"),
	reverseDescendantsOfItems = require("./reverseDescendantsOfItems"),
	setDependencyPermeable = require("./setDependencyPermeable"),
	setIdentifierOfAnonymousExportToParent = require("./setIdentifierOfAnonymousExportToParent");

module.exports =
	({
		dependencyPermeableIdentifiers,
		directoryToCreateOrAddToStacksFrom,
		identifierSeparator,
		isFileContentReversed,
		modifyFileStacksFilePath,
		packagePrefixAndScope,
		rootItemIdentifier,
	}) => {
		const
			{
				groupItems,
				removeIndexFileSuffix,
			} = createIdentifierSeparatorSpecific(
				identifierSeparator,
			);

		return (
			[
				items =>
					isFileContentReversed
					?
					reverseDescendantsOfItems(items)
					:
					items,
				removeIndexFileSuffix,
				setTypeOfRootToFile,
				orderItemsByIdentifier,
				groupItems,
				items =>
					replaceDependsUponWithHierarchyFromSeparator({
						identifierSeparator: /\/|\\/,
						items,
					}),
				items =>
					ensureRootItemWithIdentifier({
						identifier: rootItemIdentifier,
						items,
					}),
				removeSelfDependentVariables,
				orderItemsByType,
				items =>
					modifyFileStacks({
						items,
						stacksFilePath: modifyFileStacksFilePath,
					}),
				items =>
					createOrAddToStacksUsingFileSystem({
						directory:
							directoryToCreateOrAddToStacksFrom,
						items,
						subsetIdentifierHierarchy:
							createSubsetIdentifierHierarchy({
								items,
								rootItemIdentifier,
							}),
					}),
				setIdentifierOfAnonymousExportToParent,
				unstackIndependent,
				items =>
					removePackagePrefixAndScopeInDependsUpon({
						items,
						...packagePrefixAndScope,
					}),
				items =>
					setDependencyPermeable({
						dependencyPermeableIdentifiers,
						items,
					}),
				flattenSingleRootItemWhenHasOnlyItemsAndType,
			]
		);
	};

function setTypeOfRootToFile(
	items,
) {
	return (
		setTypeOfRootItems({
			items,
			type: "file",
		})
	);
}

function removeSelfDependentVariables(
	items,
) {
	return (
		removeSelfDependentItemsOfType({
			items,
			type: "variable",
		})
	);
}

function orderItemsByType(
	items,
) {
	return (
		orderItemsByIndexOfType({
			items,
			typesInOrder:
				// the type property wont be defined
				// eslint-disable-next-line no-undefined
				[ "export", undefined, "parameter", "variable", "import", "file" ],
		})
	);
}

function modifyFileStacks({
	items,
	stacksFilePath,
}) {
	return whenSpecified() || items;

	function whenSpecified() {
		return (
			stacksFilePath
			&&
			createOrAddToStacksOfParentMatch({
				addNewInTarget:
					false,
				items,
				keysAndPatterns:
					[ {
						key: "type",
						pattern: /^file$/,
					} ],
				targetLevelOrStack:
					readStack(),
			})
		);

		function readStack() {
			return (
				parseYaml(
					readFileSync(
						stacksFilePath,
						"utf-8",
					),
				)
			);
		}
	}
}

function flattenSingleRootItemWhenHasOnlyItemsAndType(
	items,
) {
	return (
		Array.isArray(items) || hasOtherProperties()
		?
		items
		:
		items.items
	);

	function hasOtherProperties() {
		return (
			Object.keys(items)
			.some(property => property !== "items" && property !== "type")
		);
	}
}