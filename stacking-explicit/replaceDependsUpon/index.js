/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		getDependsUponReplacement,
		identifierOrItemOrLevelOrStack,
	}) =>
		withGetDependsUponReplacement(
			getDependsUponReplacement,
		)
		.getIdentifierOrReplaceItemOrItemsInLevelOrStack(
			identifierOrItemOrLevelOrStack,
		);

function withGetDependsUponReplacement(
	getDependsUponReplacement,
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
		const replacement = getDependsUponReplacement(dependsUpon);

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