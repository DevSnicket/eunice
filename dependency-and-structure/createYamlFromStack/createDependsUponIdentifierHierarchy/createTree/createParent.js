/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export default createParent;

function createParent() {
	const
		childItems = new Map(),
		identifiers = new Set();

	return (
		{
			add,
			getItems,
			getOrCreateItem,
		}
	);

	function add(
		identifier,
	) {
		return identifiers.add(identifier);
	}

	function getOrCreateItem(
		identifier,
	) {
		return getWhenExists() || create();

		function getWhenExists() {
			return childItems.get(identifier);
		}

		function create() {
			const item = createParent();

			childItems.set(identifier, item);

			return item;
		}
	}

	function getItems() {
		return (
			getSingleOrArrayWhenMultiple(
				[
					...identifiers,
					...getChildItems(),
				],
			)
		);

		function * getChildItems() {
			for (const [ id, childItem ] of childItems)
				yield (
					{
						id,
						items: childItem.getItems(),
					}
				);
		}
	}
}

function getSingleOrArrayWhenMultiple(
	items,
) {
	return (
		whenSingle()
		||
		items
	);

	function whenSingle() {
		return (
			items.length === 1
			&&
			items[0]
		);
	}
}