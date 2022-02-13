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
}) => {
	return (
		typeof dependUponItem === "string"
		&&
		[ whenItemFound() || withAncestors() ]
	);

	function whenItemFound() {
		const item =
			findItemWithIdentifierInLastAncestor({
				ancestors,
				isItem,
			});

		return (
			item
			&&
			{
				ancestors,
				item,
				itemOrFirstAncestorItem:
					item,
			}
		);
	}

	function isItem(
		item,
	) {
		return (
			item.id === dependUponItem
			&&
			item !== dependent
		);
	}

	function withAncestors() {
		return (
			{
				ancestors,
				item:
					dependUponItem,
				itemOrFirstAncestorItem:
					ancestors[0],
			}
		);
	}
};