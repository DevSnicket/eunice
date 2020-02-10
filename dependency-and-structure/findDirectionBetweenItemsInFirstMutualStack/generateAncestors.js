// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat-map";

export default generateAncestors;

function * generateAncestors(
	items,
) {
	const parents = items.flatMap(getParents);

	for (const parent of parents)
		yield parent;

	for (const ancestor of generateAncestors(parents))
		yield ancestor;
}

function getParents({
	from,
	to,
}) {
	const
		fromParent = getParentItem(from),
		toParent = getParentItem(to);

	return (
		[
			...getAncestorWhenExists({
				from: fromParent,
				to,
			}),
			...getAncestorWhenExists({
				from,
				to: toParent,
			}),
			...getAncestorWhenExists({
				from: fromParent,
				to: toParent,
			}),
		]
	);
}

function getParentItem(
	item,
) {
	return item.level.stack.parent;
}

function getAncestorWhenExists({
	from,
	to,
}) {
	return (
		from && to
		?
		[ { from, to } ]
		:
		[]
	);
}