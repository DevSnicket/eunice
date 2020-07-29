// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	dependsUpon,
	isDependencyOfDifferentItemInSameLevel,
	items,
}) =>
	withIsDependencyOfDifferentItemInSameLevel(
		isDependencyOfDifferentItemInSameLevel,
	)
	.allDependsUponAndDescendantsWithDependsUponInDifferentLevel({
		dependsUpon,
		items,
	});

function withIsDependencyOfDifferentItemInSameLevel(
	isDependencyOfDifferentItemInSameLevel,
) {
	return { allDependsUponAndDescendantsWithDependsUponInDifferentLevel };

	function allDependsUponAndDescendantsWithDependsUponInDifferentLevel({
		dependsUpon,
		items,
	}) {
		return (
			allDependsUponInDifferentLevel(dependsUpon)
			&&
			allDescendantsWithDependsUponInDifferentLevel(items)
		);
	}

	function allDependsUponInDifferentLevel(
		dependsUpon,
	) {
		return (
			!dependsUpon
			||
			dependsUpon.every(
				({ itemOrFirstAncestorItem }) =>
					!itemOrFirstAncestorItem
					||
					!isDependencyOfDifferentItemInSameLevel(itemOrFirstAncestorItem),
			)
		);
	}

	function allDescendantsWithDependsUponInDifferentLevel(
		stackOfDescendant,
	) {
		return (
			!stackOfDescendant
			||
			stackOfDescendant.every(levelOfDescendant => levelOfDescendant.every(allDependsUponAndDescendantsWithDependsUponInDifferentLevel))
		);
	}
}