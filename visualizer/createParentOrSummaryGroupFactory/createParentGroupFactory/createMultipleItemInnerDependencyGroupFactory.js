/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import borderThickness from "./borderThickness";

export default ({
	createInnerDependencyGroupFactoryFromItem,
	parent,
}) => {
	return (
		hasItemsOfMultiple(parent)
		&&
		addTopOffset(
			createInnerDependencyGroupFactoryFromItem({
				item:
					parent,
				keyPrefix:
					`parent ${parent.identifier}`,
			}),
		)
	);

	function addTopOffset(
		dependencyGroupFactory,
	) {
		return (
			dependencyGroupFactory
			&&
			{
				...dependencyGroupFactory,
				height:
					dependencyGroupFactory.height
					+
					borderThickness,
			}
		);
	}
};

function hasItemsOfMultiple(
	{ items: stack },
) {
	return (
		stack
		&&
		hasMultipleItems()
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
}