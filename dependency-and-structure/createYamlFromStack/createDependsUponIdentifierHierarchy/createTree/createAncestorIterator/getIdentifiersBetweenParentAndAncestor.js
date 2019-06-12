module.exports =
	({
		ancestor,
		item,
	}) =>
		withBaseAncestor(ancestor)
		.getAncestorIdentifiersOfParent(item);

function withBaseAncestor(
	baseAncestor,
) {
	return { getAncestorIdentifiersOfParent };

	function getAncestorIdentifiersOfParent(
		item,
	) {
		return getAncestorIdentifiers(item.level.stack.parent);
	}

	function * getAncestorIdentifiers(
		parent,
	) {
		yield parent.id;

		if (parent !== baseAncestor)
			for (const identifier of getAncestorIdentifiersOfParent(parent))
				yield identifier;
	}
}