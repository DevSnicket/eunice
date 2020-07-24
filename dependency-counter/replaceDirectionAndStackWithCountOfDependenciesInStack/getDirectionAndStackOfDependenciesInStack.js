// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default inStack;

function inStack(
	stack,
) {
	return whenAny() || [];

	function whenAny() {
		return (
			stack
			&&
			stack.flatMap(inLevel)
		);
	}
}

function inLevel(
	level,
) {
	return (
		level.flatMap(inItem)
	);
}

function inItem(
	item,
) {
	return (
		[
			item.directionAndStackOfDependencies,
			...inStack(item.items),
		]
	);
}