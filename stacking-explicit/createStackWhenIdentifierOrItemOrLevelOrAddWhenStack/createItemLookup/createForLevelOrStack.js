/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import "core-js/features/array/flat-map";

import getIdentifierOrIdentifierOfItem from "../getIdentifierOrIdentifierOfItem";

export default
levelOrStack => {
	const itemsByIdentifier =
		new Map(
			// @ts-ignore
			generateKeyValuePairs(),
		);

	return (
		{
			getIdentifiersNotUsed,
			useItem,
		}
	);

	function * generateKeyValuePairs() {
		for (const identifierOrItemOrLevel of levelOrStack)
			if (Array.isArray(identifierOrItemOrLevel))
				for (const identifierOrItem of identifierOrItemOrLevel)
					yield getKeyValuePairForIdentifierOrItem(identifierOrItem);
			else
				yield getKeyValuePairForIdentifierOrItem(identifierOrItemOrLevel);
	}

	function getIdentifiersNotUsed() {
		return (
			getIterableAsArrayWhenHasItems(generate())
			||
			null
		);

		function * generate() {
			for (const { isUsed, item } of itemsByIdentifier.values())
				if (!isUsed)
					yield getIdentifierOrIdentifierOfItem(item);
		}

		function getIterableAsArrayWhenHasItems(
			iterable,
		) {
			const array = [ ...iterable ];

			return array.length && array;
		}
	}

	function useItem(
		identifierOrItem,
	) {
		const itemAndIsUsed =
			itemsByIdentifier.get(
				getIdentifierOrIdentifierOfItem(identifierOrItem),
			);

		if (itemAndIsUsed) {
			itemAndIsUsed.isUsed = true;

			return itemAndIsUsed.item;
		} else
			return null;
	}
};

function getKeyValuePairForIdentifierOrItem(
	identifierOrItem,
) {
	return (
		[
			getIdentifierOrIdentifierOfItem(identifierOrItem),
			{ item: identifierOrItem },
		]
	);
}