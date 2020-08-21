// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { isInnerStack } from "@devsnicket/eunice-dependency-and-structure";

export default
item =>
	withAncestorStack(
		item.level.stack,
	)
	.createDependencyCountsFromItem(
		item,
	);

function withAncestorStack(
	sourceStack,
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
		if (mutualStack && !isDescendantStack(mutualStack))
			yield (
				createDependencyCountOfOneAncestor({
					direction,
					isSourceStack:
						mutualStack === sourceStack,
					relationship:
						"dependents",
				})
			);
	}

	function * fromDependsUpon(
		dependsUpon,
	) {
		if (dependsUpon)
			for (const dependUpon of dependsUpon)
				yield* fromDependUpon(dependUpon);
	}

	function * fromDependUpon({
		direction,
		mutualStack,
	}) {
		if (mutualStack)
			yield (
				whenDescendant()
				||
				createDependencyCountOfOneAncestor({
					direction,
					isSourceStack:
						mutualStack === sourceStack,
					relationship:
						"dependsUpon",
				})
			);

		function whenDescendant() {
			return (
				isDescendantStack(mutualStack)
				&&
				{ descendants: { [direction]: 1 } }
			);
		}
	}

	function isDescendantStack(
		stack,
	) {
		return (
			isInnerStack({
				source: sourceStack,
				target: stack,
			})
		);
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

function createDependencyCountOfOneAncestor({
	direction,
	isSourceStack,
	relationship,
}) {
	return { [getAncestorKey()]: createAncestor() };

	function getAncestorKey() {
		return whenSourceStack() || "ancestors";

		function whenSourceStack() {
			return (
				isSourceStack
				&&
				"parent"
			);
		}
	}

	function createAncestor() {
		return { [direction]: { [relationship]: 1 } };
	}
}