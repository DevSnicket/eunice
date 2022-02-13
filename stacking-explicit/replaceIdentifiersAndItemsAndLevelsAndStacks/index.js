/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export default ({
	identifierOrItemOrLevelOrStack,
	replace,
}) =>
	withReplaceIdentifierOrItemOrLevelOrStack(
		replace,
	)
	.withAncestors(
		[],
	)
	.replaceAndReplaceIn(
		identifierOrItemOrLevelOrStack,
	);

function withReplaceIdentifierOrItemOrLevelOrStack(
	replaceIdentifierOrItemOrLevelOrStack,
) {
	return { withAncestors };

	function withAncestors(
		ancestors,
	) {
		return { replaceAndReplaceIn };

		function replaceAndReplaceIn(
			identifierOrItemOrLevelOrStack,
		) {
			return (
				replaceIdentifierOrItemOrLevelOrStack({
					ancestors,
					identifierOrItemOrLevelOrStack:
						replaceInWhenHasValue(
							identifierOrItemOrLevelOrStack,
						),
				})
			);
		}

		function replaceInWhenHasValue(
			identifierOrItemOrLevelOrStack,
		) {
			return (
				identifierOrItemOrLevelOrStack
				&&
				getIdentifierOrReplaceInItemOrLevelOrStack(identifierOrItemOrLevelOrStack)
			);
		}

		function getIdentifierOrReplaceInItemOrLevelOrStack(
			identifierOrItemOrLevelOrStack,
		) {
			return (
				whenLevelOrStack()
				||
				getWhenIdentifierOrReplaceInItem(identifierOrItemOrLevelOrStack)
			);

			function whenLevelOrStack() {
				return (
					Array.isArray(identifierOrItemOrLevelOrStack)
					&&
					replaceInLevelOrStack(identifierOrItemOrLevelOrStack)
				);
			}
		}

		function replaceInLevelOrStack(
			levelOrStack,
		) {
			return whenStack() || replaceInLevel(levelOrStack);

			function whenStack() {
				return (
					levelOrStack.some(Array.isArray)
					&&
					replaceInStack(levelOrStack)
				);
			}
		}

		function replaceInStack(
			stack,
		) {
			return stack.map(getWhenIdentifierOrReplaceInItemOrLevel);
		}

		function getWhenIdentifierOrReplaceInItemOrLevel(
			level,
		) {
			return (
				whenLevel()
				||
				getWhenIdentifierOrReplaceInItem(level)
			);

			function whenLevel() {
				return (
					Array.isArray(level)
					&&
					replaceInLevel(level)
				);
			}
		}

		function replaceInLevel(
			level,
		) {
			return level.map(getWhenIdentifierOrReplaceInItem);
		}

		function getWhenIdentifierOrReplaceInItem(
			identifierOrItem,
		) {
			return (
				whenIdentifier()
				||
				replaceInItem(identifierOrItem)
			);

			function whenIdentifier() {
				return (
					typeof identifierOrItem === "string"
					&&
					identifierOrItem
				);
			}
		}

		function replaceInItem(
			item,
		) {
			return (
				replaceItemsOfItem({
					item,
					items:
						withAncestors(
							[ ...ancestors, item ],
						)
						.replaceAndReplaceIn(
							item.items,
						),
				})
			);
		}
	}
}

function replaceItemsOfItem({
	item: {
		// remove old items property
		// eslint-disable-next-line no-unused-vars
		items: oldItems,
		...restOfItem
	},
	items,
}) {
	return (
		{
			...restOfItem,
			...items && { items },
		}
	);
}