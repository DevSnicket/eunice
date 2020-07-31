// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	dependency,
	isInnerStack,
	item,
	levelDirection,
}) => {
	return (
		item !== dependency.item
		&&
		hasLevel()
		&&
		!isChild()
		&&
		isOuter()
		&&
		isLevelInDirection()
	);

	function hasLevel() {
		return Boolean(dependency.item.level);
	}

	function isChild() {
		return dependency.item.level.stack === item.items;
	}

	function isOuter() {
		return (
			!isInnerStack({
				source: item.items,
				target: dependency.item.level.stack,
			})
		);
	}

	function isLevelInDirection() {
		return dependency.direction === levelDirection;
	}
};