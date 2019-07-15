/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		identifierOrItemOrLevelOrStack,
		replace,
	}) =>
		withReplace(
			replace,
		)
		.withAncestors(
			[],
		)
		.replaceAndReplaceIn(
			identifierOrItemOrLevelOrStack,
		);

function withReplace(
	replace,
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
				replaceInWhenHasValue(
					replace({
						ancestors,
						identifierOrItemOrLevelOrStack,
					}),
				)
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
					Array.isArray(levelOrStack[0])
					&&
					replaceInStack(levelOrStack)
				);
			}
		}

		function replaceInStack(
			stack,
		) {
			return stack.map(replaceInLevel);
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
				{
					...item,
					...getItemsProperty(),
				}
			);

			function getItemsProperty() {
				const items = getItems();

				return (
					items
					&&
					{ items }
				);
			}

			function getItems() {
				return (
					withAncestors(
						[ ...ancestors, item ],
					)
					.replaceAndReplaceIn(
						item.items,
					)
				);
			}
		}
	}
}