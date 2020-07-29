// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	dependents,
	isDependencyOfDifferentItemInSameLevel,
	items,
}) =>
	withIsDependencyOfDifferentItemInSameLevel(
		isDependencyOfDifferentItemInSameLevel,
	)
	.anyDependentsOrDescendantsWithDependentsOfDifferentItemInSameLevel({
		dependents,
		items,
	});

function withIsDependencyOfDifferentItemInSameLevel(
	isDependencyOfDifferentItemInSameLevel,
) {
	return { anyDependentsOrDescendantsWithDependentsOfDifferentItemInSameLevel };

	function anyDependentsOrDescendantsWithDependentsOfDifferentItemInSameLevel({
		dependents,
		items,
	}) {
		return (
			anyDependentsOfDifferentItemInSameLevel(dependents)
			||
			anyDescendantsInStackWithDependentsOfDifferentItemInSameLevel(items)
		);
	}

	function anyDependentsOfDifferentItemInSameLevel(
		dependents,
	) {
		return (
			dependents
			&&
			dependents.some(isDependencyOfDifferentItemInSameLevel)
		);
	}

	function anyDescendantsInStackWithDependentsOfDifferentItemInSameLevel(
		stackOfDescendant,
	) {
		return (
			stackOfDescendant
			&&
			stackOfDescendant.some(levelOfDescendant => levelOfDescendant.some(anyDependentsOrDescendantsWithDependentsOfDifferentItemInSameLevel))
		);
	}
}