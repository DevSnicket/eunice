/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

require("array.prototype.flatmap")
.shim();

module.exports =
	levelOrStack => {
		const itemsByIdentifier = new Map(generateKeyValuePairs());

		return (
			{
				getIdentifiersNotUsed,
				getItemWithIdentifier,
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
						yield getIdentifier(item);
			}

			function getIterableAsArrayWhenHasItems(
				iterable,
			) {
				const array = [ ...iterable ];

				return array.length && array;
			}
		}

		function getItemWithIdentifier(
			identifier,
		) {
			const itemAndIsUsed = itemsByIdentifier.get(identifier);

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
			getIdentifier(identifierOrItem),
			{ item: identifierOrItem },
		]
	);
}

function getIdentifier(
	identifierOrItem,
) {
	return identifierOrItem.id || identifierOrItem;
}