// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat";

import sumDependencyCountOfItems from "./sumDependencyCountOfItems";

export default
stack => {
	return (
		hasMultipleItems()
		&&
		getOrSum()
	);

	function hasMultipleItems() {
		return (
			hasMultipleLevels()
			||
			hasSingleLevelOfMultipleItems()
		);

		function hasMultipleLevels() {
			return stack.length > 1;
		}

		function hasSingleLevelOfMultipleItems() {
			return (
				stack.length === 1
				&&
				stack[0].length > 1
			);
		}
	}

	function getOrSum() {
		return (
			getFromWhenHasParent(stack)
			||
			sumDependencyCountOfItems(
				stack.flat(2),
			)
		);
	}
};

function getFromWhenHasParent(
	{ parent },
) {
	return (
		parent
		&&
		parent.dependencyCount
		&&
		parent.dependencyCount.inner
	);
}