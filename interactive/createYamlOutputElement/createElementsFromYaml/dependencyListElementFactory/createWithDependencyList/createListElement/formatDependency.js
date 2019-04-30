module.exports =
	dependency =>
		getItemAndAncestorIdentifiers(dependency)
		.join(": ");

function getItemAndAncestorIdentifiers(
	item,
) {
	return (
		[
			...getAncestorIdentifiersWhenHasParent(item) || [],
			item.id || "anonymous",
		]
	);
}

function getAncestorIdentifiersWhenHasParent(
	{ level: { stack: { parent } } },
) {
	return parent && getItemAndAncestorIdentifiers(parent);
}