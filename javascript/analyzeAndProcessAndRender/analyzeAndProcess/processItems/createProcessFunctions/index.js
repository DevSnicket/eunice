const
	createIdentifierSeparatorSpecific = require("./createIdentifierSeparatorSpecific"),
	createOrAddToStacks = require("./createOrAddToStacks"),
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
				createOrAddToStacksToItemsWithIdentifier,
				createOrAddToStacksUniformly,
			},
		setIdentifierOfAnonymousToParent,
		setTypeOfRootItems,
		unstackIndependent,
	} = require("@devsnicket/eunice-processors");

module.exports =
	({
		directoryToCreateOrAddToStacksFrom,
		identifierSeparator,
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
				removeIndexFileSuffix,
				setTypeOfRootToFile,
				orderItemsByIdentifier,
				groupItems,
				items =>
					replaceDependsUponWithHierarchyFromSeparator({
						identifierSeparator: "/",
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
				addJestMethodsToBottom,
				unstackIndependent,
				items =>
					createOrAddToStacks({
						directory:
							directoryToCreateOrAddToStacksFrom,
						items,
						rootItemIdentifier,
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
				[ undefined, "parameter", "variable", "file" ],
		})
	);
}

function stackBinAndTestAtTop(
	items,
) {
	return (
		createOrAddToStacksUniformly({
			identifiersInNewStack:
				[
					[ "bin", "test" ],
					"existing",
				],
			items,
		})
	);
}

function addJestMethodsToBottom(
	items,
) {
	return (
		createOrAddToStacksToItemsWithIdentifier({
			identifierPattern:
				/^test$|test[A-Z]/,
			identifiersInNewStack:
				[
					[ "existing" ],
					[ "expect", "test" ],
				],
			items,
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