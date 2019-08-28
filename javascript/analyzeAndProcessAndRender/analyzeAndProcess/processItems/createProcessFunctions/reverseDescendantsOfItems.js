// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports = reverseDescendantsOfItems;

function reverseDescendantsOfItems(
	items,
) {
	return items.map(reverseDescendantsOfItem);
}

function reverseDescendantsOfItem(
	item,
) {
	return (
		whenHasMultipleItems(item)
		||
		item
	);

	function whenHasMultipleItems({
		items,
		...restOfItem
	}) {
		return (
			Array.isArray(items)
			&&
			{
				items:
					items
					.reduceRight(
						(reversed, level) =>
							[
								...reversed,
								reverseDescendantsOfItems(level),
							],
						[],
					),
				...restOfItem,
			}
		);
	}
}