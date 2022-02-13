/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import "core-js/features/array/flat-map";

import findInDescendantsOfItems from "./findInDescendantsOfItems";

export default ({
	dependent,
	identifier,
	stack,
}) =>
	withIsItem(
		item =>
			item.id === identifier
			&&
			item !== dependent,
	)
	.findItemInStack(stack);

function withIsItem(
	isItem,
) {
	return { findItemInStack };

	function findItemInStack(
		stack,
	) {
		const items = stack.flat(2);

		return (
			findItems(items)
			||
			findWhenIsOrInParent(stack.parent)
			||
			findInDescendantsOfItems({
				findItems,
				items,
			})
		);
	}

	function findWhenIsOrInParent(
		parent,
	) {
		return (
			parent
			&&
			(getWhenParent() || findInParent())
		);

		function getWhenParent() {
			return (
				isItem(parent)
				&&
				parent
			);
		}

		function findInParent() {
			return findItemInStack(parent.level.stack);
		}
	}

	function findItems(
		items,
	) {
		return items.find(isItem);
	}
}