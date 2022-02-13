/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import "core-js/features/array/flat-map";

export default
function * generateAncestorPairs(
	itemPair,
) {
	yield itemPair;
	yield* generateAncestorPairsFromItemPairs([ itemPair ]);
}

function * generateAncestorPairsFromItemPairs(
	itemPairs,
) {
	if (itemPairs.length) {
		const parentPairs = [ ...getParentPairsOfItemPairs(itemPairs) ];

		yield* parentPairs;

		yield* generateAncestorPairsFromItemPairs(parentPairs);
	}
}

function * getParentPairsOfItemPairs(
	itemPairs,
) {
	for (const itemPair of itemPairs)
		yield* getParentPairsOfItemPair(itemPair);
}

function * getParentPairsOfItemPair({
	from,
	to,
}) {
	const
		fromParent = getParentOfItem(from),
		toParent = getParentOfItem(to);

	yield* (
		getItemPairWhenExists({
			from: fromParent,
			to,
		})
	);

	yield* (
		getItemPairWhenExists({
			from,
			to: toParent,
		})
	);

	yield* (
		getItemPairWhenExists({
			from: fromParent,
			to: toParent,
		})
	);
}

function getParentOfItem(
	item,
) {
	return item.level.stack.parent;
}

function * getItemPairWhenExists({
	from,
	to,
}) {
	if (from && to)
		yield { from, to };
}