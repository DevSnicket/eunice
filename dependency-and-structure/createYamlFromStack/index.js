/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createDependsUponIdentifierHierarchy from "./createDependsUponIdentifierHierarchy";

export default createYamlFromStack;

/**
  * @param {import("../Stack.d")} stack
  * @returns {import("../Yaml.d")}
  */
function createYamlFromStack(
	stack,
) {
	return (
		whenSingleLevelOrItem()
		||
		stack.map(createFromLevel)
	);

	function whenSingleLevelOrItem() {
		return (
			stack.length === 1
			&&
			createFromLevel(stack[0])
		);
	}

	function createFromLevel(
		level,
	) {
		return (
			whenSingleItem()
			||
			level.map(createFromItem)
		);

		function whenSingleItem() {
			return (
				stack.length === 1
				&&
				level.length === 1
				&&
				createFromItem(level[0])
			);
		}
	}
}

function createFromItem({
	// parameter specified, but not used to remove it from the rest property
	// eslint-disable-next-line no-unused-vars
	dependents,
	dependsUpon,
	id: identifier,
	items,
	// parameter specified, but not used to remove it from the rest property
	// eslint-disable-next-line no-unused-vars
	level,
	...restOfItem
}) {
	const
		dependsUponProperty =
			createDependsUponProperty(
				dependsUpon,
			),
		itemsProperty =
			createItemsProperty(
				items,
			);

	return (
		whenStructured()
		||
		identifier
		||
		{}
	);

	function whenStructured() {
		return (
			(dependsUponProperty || itemsProperty || Object.keys(restOfItem).length)
			&&
			{
				...identifier && { id: identifier },
				...restOfItem,
				...dependsUponProperty,
				...itemsProperty,
			}
		);
	}
}

function createDependsUponProperty(
	dependsUpon,
) {
	return (
		dependsUpon
		&&
		{ dependsUpon: createDependsUponIdentifierHierarchy(dependsUpon) }
	);
}

function createItemsProperty(
	items,
) {
	return (
		items
		&&
		{ items: createYamlFromStack(items) }
	);
}