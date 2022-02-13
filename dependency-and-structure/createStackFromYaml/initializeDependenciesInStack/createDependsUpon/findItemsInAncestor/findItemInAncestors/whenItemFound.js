/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import findItemWithIdentifierInLastAncestor from "./findItemWithIdentifierInLastAncestor";

export default ({
	ancestors,
	dependUponItem,
	dependent,
	findInAncestors,
}) => {
	return (
		fromItemsWhenAny(
			findItemWithIdentifierInLastAncestor({
				ancestors,
				isItem,
			}),
		)
	);

	function isItem(
		item,
	) {
		return (
			item.id === dependUponItem.id
			&&
			item !== dependent
		);
	}

	function fromItemsWhenAny(
		item,
	) {
		return item && fromItems();

		function fromItems() {
			return (
				whenArray()
				||
				createDependsUponFromChildItem(dependUponItem.items)
			);

			function whenArray() {
				return (
					Array.isArray(dependUponItem.items)
					&&
					dependUponItem.items.flatMap(createDependsUponFromChildItem)
				);
			}

			function createDependsUponFromChildItem(
				childItem,
			) {
				return (
					findInAncestors({
						ancestors: [ item, ...ancestors ],
						dependUponItem: childItem,
						dependent,
					})
				);
			}
		}
	}
};