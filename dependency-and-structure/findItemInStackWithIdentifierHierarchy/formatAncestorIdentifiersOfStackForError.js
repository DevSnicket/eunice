module.exports =
	stack =>
		ofItemWhenHasValue(stack.parent)
		||
		"";

function ofItemWhenHasValue(
	item,
) {
	return (
		item
		&&
		` in hierarchy ${formatHierarchy()}`
	);

	function formatHierarchy() {
		return (
			joinIdentifiers(
				getIdentifiersOfItemAndAncestors(
					item,
				),
			)
		);
	}
}

function * getIdentifiersOfItemAndAncestors(
	item,
) {
	yield `"${item.id}"`;

	if (item.level.stack.parent)
		for (const ancestor of getIdentifiersOfItemAndAncestors(item.level.stack.parent))
			yield ancestor;
}

function joinIdentifiers(
	identifiers,
) {
	return (
		[ ...identifiers ]
		.reverse()
		.join("->")
	);
}