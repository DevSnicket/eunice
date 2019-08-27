// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({
		dependency,
		findDirectionBetweenItemsInFirstMutualStack,
		isInnerStack,
		item,
		level,
	}) => {
		return (
			item !== dependency
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
			return Boolean(dependency.level);
		}

		function isChild() {
			return dependency.level.stack === item.items;
		}

		function isOuter() {
			return (
				!isInnerStack({
					source: item.items,
					target: dependency.level.stack,
				})
			);
		}

		function isLevelInDirection() {
			return getDirection() === level;

			function getDirection() {
				return (
					findDirectionBetweenItemsInFirstMutualStack({
						from: item,
						to: dependency,
					})
					.direction
				);
			}
		}
	};