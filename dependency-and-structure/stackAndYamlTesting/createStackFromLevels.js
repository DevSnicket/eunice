/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export default createStackFromLevels;

function createStackFromLevels(
	levels,
) {
	return (
		mapWithNewArray(
			levels,
			(level, stack) =>
				createLevel({
					items: level,
					stack,
				}),
		)
	);
}

function createLevel({
	items,
	stack,
}) {
	return (
		Object.assign(
			mapWithNewArray(
				items,
				(item, level) =>
					createItem({
						...item,
						level,
					}),
			),
			{ stack },
		)
	);
}

function mapWithNewArray(
	items,
	mapFunction,
) {
	const newArray = Array(items.length);

	for (let index = 0; index < items.length; index++)
		newArray[index] =
			mapFunction(
				items[index],
				newArray,
			);

	return newArray;
}

function createItem({
	id,
	items,
	level,
	...restOfItem
}) {
	/** @type {import("../Stack").Item} */
	const item =
		{
			...id && { id },
			level,
			...restOfItem,
		};

	// initialization must mutate read-only property as its a reference to its own instance
	if (items)
		// @ts-ignore
		item.items =
			Object.assign(
				createStackFromLevels(items),
				{ parent: item },
			);

	return item;
}