/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

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