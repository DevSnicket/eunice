// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createIdentifierSeparatorSpecific = require("./createIdentifierSeparatorSpecific"),
	createSubsetIdentifierHierarchy = require("./createSubsetIdentifierHierarchy"),
	ensureRootItemWithIdentifier = require("./ensureRootItemWithIdentifier"),
	modifyStacksWithFile = require("./modifyStacksWithFile"),
	removeEmptySelfDependentOfType = require("./removeEmptySelfDependentOfType"),
	removePackagePrefixAndScopeInDependsUpon = require("./removePackagePrefixAndScopeInDependsUpon"),
	{
		replacement:
			{ replaceDependsUponWithHierarchyFromSeparator },
		sorting:
			{
				orderItemsByIdentifier,
				orderItemsByIndexOfType,
			},
		stacking:
			{ createOrAddToStacksUsingFileSystem },
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
		modifyStacksFile,
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
				items =>
					removeEmptySelfDependentOfType({
						items,
						type: "variable",
					}),
				orderItemsByType,
				items =>
					modifyStacksWithFile({
						...modifyStacksFile,
						items,
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
				items =>
					removeEmptySelfDependentOfType({
						items,
						type: "export",
					}),
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