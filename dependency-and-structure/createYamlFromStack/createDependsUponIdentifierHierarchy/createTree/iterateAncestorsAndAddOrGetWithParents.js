module.exports =
	dependsUpon =>
		dependsUpon
		.reduce(
			(
				dependsUponWithParents,
				dependUpon,
			) =>
				[
					...dependsUponWithParents,
					...iterateAncestorsAndAddOrGetWhenHasParent(dependUpon),
				],
			[],
		);

function * iterateAncestorsAndAddOrGetWhenHasParent({
	identifiers,
	parent,
}) {
	const ancestor = identifiers.ancestorIterator.next().value;

	if (ancestor)
		yield (
			{
				identifiers,
				parent: parent.getOrCreateItem(ancestor),
			}
		);
	else
		parent.add(identifiers.item);
}