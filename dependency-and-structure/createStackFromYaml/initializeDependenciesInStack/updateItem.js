/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import "core-js/features/array/flat-map";

export default ({
	dependsUpon,
	item,
}) =>
	withItem(item)
	.setDependsUpon(dependsUpon);

function withItem(
	item,
) {
	return { setDependsUpon };

	function setDependsUpon(
		dependsUpon,
	) {
		item.dependsUpon = dependsUpon;

		for (const { itemOrFirstAncestorItem: dependUponItem } of dependsUpon)
			if (dependUponItem)
				addDependentToDependUponItem(dependUponItem);
	}

	function addDependentToDependUponItem(
		dependUponItem,
	) {
		if (dependUponItem.dependents) {
			if (!isAlreadyAdded())
				dependUponItem.dependents.push(
					{ item },
				);
		} else
			dependUponItem.dependents = [ { item } ];

		function isAlreadyAdded() {
			return (
				dependUponItem.dependents.some(
					dependent => dependent.item === item,
				)
			);
		}
	}
}