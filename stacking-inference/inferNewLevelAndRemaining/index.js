/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import allDependenciesInDifferentLevel from "./allDependenciesInDifferentLevel";
import anyDependenciesInSameLevel from "./anyDependenciesInSameLevel";
import groupBy from "lodash/groupBy";

export default
// ignore lodash groupBy TypeScript return type
/** @returns {{newLevel, remaining}} */
({
	dependenciesFromItemSelectors,
	level,
}) => {
	// @ts-ignore
	return (
		groupBy(
			level,
			getNewLevelOrRemaining,
		)
	);

	function getNewLevelOrRemaining(
		item,
	) {
		return (
			(canBeInNewLevel() && "newLevel")
			||
			"remaining"
		);

		function canBeInNewLevel() {
			return (
				allDependenciesInDifferentLevel({
					dependenciesFromItemSelector:
						dependenciesFromItemSelectors.allInDifferentLevel,
					isDependencyOfDifferentItemInSameLevel,
					item,
				})
				&&
				anyDependenciesInSameLevel({
					dependenciesFromItemSelector:
						dependenciesFromItemSelectors.anyInSameLevel,
					isDependencyOfDifferentItemInSameLevel,
					item,
				})
			);
		}

		function isDependencyOfDifferentItemInSameLevel(
			dependency,
		) {
			return (
				dependency !== item
				&&
				isOrHasAncestor()
			);

			function isOrHasAncestor() {
				return (
					dependency.level === level
					||
					hasAncestor()
				);
			}

			function hasAncestor() {
				return (
					dependency.level.stack.parent
					&&
					isDependencyOfDifferentItemInSameLevel(dependency.level.stack.parent)
				);
			}
		}
	}
};