// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

import "core-js/features/array/flat-map";

import getIdentifierOrIdentifierOfItem from "../getIdentifierOrIdentifierOfItem";

export default
levelOrStack => {
	const itemsByIdentifier = new Map(generateKeyValuePairs());

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