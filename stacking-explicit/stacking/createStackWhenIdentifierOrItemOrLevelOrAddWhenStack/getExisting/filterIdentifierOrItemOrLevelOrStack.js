// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

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