// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

export default ({
	identifierOrItemOrLevelOrStack,
	replace,
}) =>
	withReplace(
		replace,
	)
	.getIdentifierOrReplaceItemOrItemsInLevelOrStack(
		identifierOrItemOrLevelOrStack,
	);

function withReplace(
	replace,
) {
	return { getIdentifierOrReplaceItemOrItemsInLevelOrStack };

	function getIdentifierOrReplaceItemOrItemsInLevelOrStack(
		identifierOrItemOrLevelOrStack,
	) {
		return (
			whenLevelOrStack()
			||
			getIdentifierOrReplaceInItem(identifierOrItemOrLevelOrStack)
		);

		function whenLevelOrStack() {
			return (
				Array.isArray(identifierOrItemOrLevelOrStack)
				&&
				identifierOrItemOrLevelOrStack.map(getIdentifierOrReplaceInItemOrLevel)
			);
		}
	}

	function getIdentifierOrReplaceInItemOrLevel(
		levelOrItemOrIdentifier,
	) {
		return (
			whenLevel()
			||
			getIdentifierOrReplaceInItem(levelOrItemOrIdentifier)
		);

		function whenLevel() {
			return (
				Array.isArray(levelOrItemOrIdentifier)
				&&
				levelOrItemOrIdentifier.map(getIdentifierOrReplaceInItem)
			);
		}
	}

	function getIdentifierOrReplaceInItem(
		itemOrIdentifier,
	) {
		return (
			whenIdentifier()
			||
			replaceItemAndInItems(itemOrIdentifier)
		);

		function whenIdentifier() {
			return (
				typeof itemOrIdentifier === "string"
				&&
				itemOrIdentifier
			);
		}
	}

	function replaceItemAndInItems({
		dependsUpon,
		items,
		...restOfItem
	}) {
		return (
			{
				...restOfItem,
				...createPropertyFromDependsUpon(dependsUpon),
				...createPropertyFromItems(items),
			}
		);
	}

	function createPropertyFromDependsUpon(
		dependsUpon,
	) {
		const replacement = replace(dependsUpon);

		return (
			replacement
			&&
			{ dependsUpon: replacement }
		);
	}

	function createPropertyFromItems(
		items,
	) {
		return (
			items
			&&
			{ items: getIdentifierOrReplaceItemOrItemsInLevelOrStack(items) }
		);
	}
}