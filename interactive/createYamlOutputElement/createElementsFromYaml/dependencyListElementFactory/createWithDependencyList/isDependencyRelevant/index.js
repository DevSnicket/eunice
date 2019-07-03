/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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