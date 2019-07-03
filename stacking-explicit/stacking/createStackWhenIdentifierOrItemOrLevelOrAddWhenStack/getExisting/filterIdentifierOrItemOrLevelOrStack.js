/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

require("array.prototype.flatmap")
.shim();

module.exports =
	({
		identifierOrItemPredicate,
		identifierOrItemOrLevelOrStack,
	}) =>
		withIdentifierOrItemPredicate(
			identifierOrItemPredicate,
		)
		.filterIdentifierOrItemOrLevelOrStack(
			identifierOrItemOrLevelOrStack,
		)
		||
		null;

function withIdentifierOrItemPredicate(
	identifierOrItemPredicate,
) {
	return { filterIdentifierOrItemOrLevelOrStack };

	function filterIdentifierOrItemOrLevelOrStack(
		identifierOrItemOrLevelOrStack,
	) {
		return (
			Array.isArray(identifierOrItemOrLevelOrStack)
			?
			filterLevelOrStack(identifierOrItemOrLevelOrStack)
			:
			asIdentifierOrItem()
		);

		function asIdentifierOrItem() {
			return (
				identifierOrItemPredicate(identifierOrItemOrLevelOrStack)
				&&
				identifierOrItemOrLevelOrStack
			);
		}
	}

	function filterLevelOrStack(
		levelOrStack,
	) {
		const filtered = whenStack() || filterLevel(levelOrStack);

		return filtered.length && filtered;

		function whenStack() {
			return (
				levelOrStack.some(Array.isArray)
				&&
				levelOrStack.flatMap(filterIdentifierOrItemOrLevelInStack)
			);
		}
	}

	function filterIdentifierOrItemOrLevelInStack(
		identifierOrItemOrLevel,
	) {
		return (
			whenLevel()
			||
			asIdentifierOrItem()
			||
			[]
		);

		function whenLevel() {
			return (
				Array.isArray(identifierOrItemOrLevel)
				&&
				filterLevelInStack(identifierOrItemOrLevel)
			);
		}

		function asIdentifierOrItem() {
			return (
				identifierOrItemPredicate(identifierOrItemOrLevel)
				&&
				[ [ identifierOrItemOrLevel ] ]
			);
		}
	}

	function filterLevelInStack(
		level,
	) {
		const filtered = filterLevel(level);

		return filtered.length ? [ filtered ] : [];
	}

	function filterLevel(
		level,
	) {
		return level.filter(identifierOrItemPredicate);
	}
}