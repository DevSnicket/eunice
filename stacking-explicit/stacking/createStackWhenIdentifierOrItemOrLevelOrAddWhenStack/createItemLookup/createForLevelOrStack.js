// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

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