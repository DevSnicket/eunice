// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	itemIdentifierSelector,
	itemsSelector,
	parentsWithItems,
	type,
}) =>
	parentsWithItems.length
	&&
	formatMessage({
		formatParentWithItems:
			parentWithItems =>
				combineParentAndItemsFormatted({
					items:
						formatItems({
							itemIdentifierSelector,
							items: itemsSelector(parentWithItems),
						}),
					parent:
						formatParent(
							parentWithItems.parent,
						),
				}),
		parentsWithItems,
		type,
	});

function formatItems({
	itemIdentifierSelector,
	items,
}) {
	return (
		items
		.map(item => `"${itemIdentifierSelector(item)}"`)
		.join(",")
	);
}

function formatParent({
	end,
	id,
	key,
	start,
}) {
	return `Expression from character ${start} to ${end}${formatParentIdentifier(id || key)}`;
}

function formatParentIdentifier(
	identifier,
) {
	return (
		identifier
		?
		` with identifier "${identifier.name}"`
		:
		""
	);
}

function combineParentAndItemsFormatted({
	items,
	parent,
}) {
	return `${parent} contains unhandled identifiers of ${items}`;
}

function formatMessage({
	formatParentWithItems,
	parentsWithItems,
	type,
}) {
	return (
		[
			`Unhandled ${type}:`,
			...parentsWithItems.map(formatParentWithItems),
		]
		.join("\n")
	);
}