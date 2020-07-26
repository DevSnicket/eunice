// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat";

import sumDependencyCountOfItems from "./sumDependencyCountOfItems";

export default
stack =>
	whenHasParent(stack)
	||
	sumDependencyCountOfItems(
		stack.flat(2),
	);

function whenHasParent(
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