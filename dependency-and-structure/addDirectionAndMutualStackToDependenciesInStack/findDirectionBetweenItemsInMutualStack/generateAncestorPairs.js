// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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