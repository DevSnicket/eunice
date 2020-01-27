// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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
	const ancestor = identifiers.ancestorsIterator.next().value;

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