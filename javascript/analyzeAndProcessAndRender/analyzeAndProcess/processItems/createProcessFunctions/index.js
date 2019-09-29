// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createIdentifierSeparatorSpecific = require("./createIdentifierSeparatorSpecific"),
	createSubsetIdentifierHierarchy = require("./createSubsetIdentifierHierarchy"),
	ensureRootItemWithIdentifier = require("./ensureRootItemWithIdentifier"),
	removePackagePrefixAndScopeInDependsUpon = require("./removePackagePrefixAndScopeInDependsUpon"),
	{
		removeSelfDependentItemsOfType,
		replaceDependsUponWithHierarchyFromSeparator,
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
		setIdentifierOfAnonymousToParent,
		setTypeOfRootItems,
		unstackIndependent,
	} = require("@devsnicket/eunice-processors"),
	reverseDescendantsOfItems = require("./reverseDescendantsOfItems");

module.exports =
	({
		directoryToCreateOrAddToStacksFrom,
		identifierSeparator,
		isFileContentReversed,
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
				setIdentifierOfAnonymousToParent,
				removeSelfDependentVariables,
				orderItemsByType,
				stackBinAndTestAtTop,
				unstackIndependent,
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
				items =>
					removePackagePrefixAndScopeInDependsUpon({
						items,
						...packagePrefixAndScope,
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

function stackBinAndTestAtTop(
	items,
) {
	return (
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
				[
					[ "bin", "test" ],
					"existing",
				],
		})
	);
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