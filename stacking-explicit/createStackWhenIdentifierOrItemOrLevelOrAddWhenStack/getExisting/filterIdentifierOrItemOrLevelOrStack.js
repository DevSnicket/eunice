/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import "core-js/features/array/flat-map";

export default ({
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