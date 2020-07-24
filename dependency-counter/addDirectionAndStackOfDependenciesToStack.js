// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { findDirectionBetweenItemsInFirstMutualStack } from "@devsnicket/eunice-dependency-and-structure";

export default addToStack;

function addToStack(
	stack,
) {
	return (
		stack.map(
			level =>
				level.map(addToItem),
		)
	);
}

function addToItem(
	item,
) {
	return {
		...item,
		directionAndStackOfDependencies: {
			...createDependsUponProperty(),
			...createDependentsProperty(),
		},
		...item.items && { items: addToStack(item.items) },
	};

	function createDependsUponProperty() {
		return (
			item.dependsUpon
			&&
			{ dependsUpon: item.dependsUpon.flatMap(addToDependUpon) }
		);

		function addToDependUpon(
			dependUpon,
		) {
			return (
				whenString()
				||
				findDirectionAndStack(dependUpon.item)
			);

			function whenString() {
				return (
					typeof dependUpon.item === "string"
					&&
					[]
				);
			}
		}
	}

	function createDependentsProperty() {
		return (
			item.dependents
			&&
			{ dependents: item.dependents.map(findDirectionAndStack) }
		);
	}

	function findDirectionAndStack(
		dependency,
	) {
		return (
			findDirectionBetweenItemsInFirstMutualStack({
				from: item,
				to: dependency,
			})
		);
	}
}