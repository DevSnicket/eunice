module.exports = generateAncestors;

function * generateAncestors({
	from,
	to,
}) {
	const parents = getParents({ from, to });

	for (const parent of parents)
		yield parent;

	for (const parent of parents)
		for (const ancestor of generateAncestors(parent))
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