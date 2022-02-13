/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import "core-js/features/array/flat";
import "core-js/features/array/flat-map";

import createDependsUpon from "./createDependsUpon";
import findItemWithIdentifierFromStack from "./findItemWithIdentifierFromStack";
import updateItem from "./updateItem";

export default initializeDependenciesInStack;

function initializeDependenciesInStack(
	stack,
) {
	for (const level of stack)
		for (const item of level) {
			updateItemWhenRequired(item);

			if (item.items)
				initializeDependenciesInStack(item.items);
		}

	function updateItemWhenRequired(
		item,
	) {
		if (item.dependsUpon)
			updateItem({
				dependsUpon:
					item.dependsUpon.flatMap(findItemAndCreateDependsUpon),
				item,
			});

		function findItemAndCreateDependsUpon(
			dependUpon,
		) {
			return (
				whenString()
				||
				createDependsUpon({
					ancestor:
						findItemWithIdentifier(
							dependUpon.id,
						),
					dependUpon,
					dependent:
						item,
				})
			);

			function whenString() {
				return (
					typeof dependUpon === "string"
					&&
					createWithItem(
						findItemWithIdentifier(
							dependUpon,
						),
					)
				);

				function createWithItem(
					dependUponItem,
				) {
					return {
						item:
							dependUponItem || dependUpon,
						...createItemOrFirstAncestorItemProperty(),
					};

					function createItemOrFirstAncestorItemProperty() {
						return (
							dependUponItem
							&&
							{ itemOrFirstAncestorItem: dependUponItem }
						);
					}
				}
			}

			function findItemWithIdentifier(
				identifier,
			) {
				return (
					findItemWithIdentifierFromStack({
						dependent:
							item,
						identifier,
						stack:
							item.items || stack,
					})
				);
			}
		}
	}
}