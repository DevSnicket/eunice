/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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
				unstackIndependent,
				items =>
					createOrAddToStacks({
						directory:
							directoryToCreateOrAddToStacksFrom,
						items,
						rootItemIdentifier,
					}),
				addJestMethodsToBottom,
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
			items,
			targetLevelOrStack:
				[
					[ "bin", "test" ],
					"existing",
				],
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
			items,
			targetLevelOrStack:
				[
					[ "existing" ],
					[ "expect", "test" ],
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