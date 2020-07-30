// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	isInnerStack,
	item,
}) =>
	withIsInnerStack(isInnerStack)
	.createDependencyCountsFromItem(item);

function withIsInnerStack(
	isInnerStack,
) {
	return { createDependencyCountsFromItem };

	function * createDependencyCountsFromItem({
		dependents,
		dependsUpon,
		items,
	}) {
		yield* fromDependents(dependents);
		yield* fromDependsUpon(dependsUpon);
		yield* fromItems(items);
	}

	function * fromDependents(
		dependents,
	) {
		if (dependents)
			for (const dependent of dependents)
				yield* fromDependent(dependent);
	}

	function * fromDependent({
		direction,
		mutualStack,
	}) {
		if (mutualStack && !isInnerStack(mutualStack))
			yield (
				createDependencyCountOfOuterOne({
					direction,
					relationship: "dependents",
				})
			);
	}

	function * fromDependsUpon(
		dependsUpon,
	) {
		if (dependsUpon)
			for (const dependUpon of dependsUpon)
				if (dependUpon.mutualStack)
					yield fromDependUpon(dependUpon);
	}

	function fromDependUpon({
		direction,
		mutualStack,
	}) {
		return (
			whenInner()
			||
			createDependencyCountOfOuterOne({
				direction,
				relationship: "dependsUpon",
			})
		);

		function whenInner() {
			return (
				isInnerStack(mutualStack)
				&&
				{ inner: { [direction]: 1 } }
			);
		}
	}

	function * fromItems(
		items,
	) {
		if (items)
			for (const level of items)
				for (const item of level)
					yield* createDependencyCountsFromItem(item);
	}
}

function createDependencyCountOfOuterOne({
	direction,
	relationship,
}) {
	return { outer: createOuter() };

	function createOuter() {
		return { [direction]: { [relationship]: 1 } };
	}
}