/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export default createStackFromParsedYaml;

function createStackFromParsedYaml(
	yaml,
) {
	const stack =
		Array.isArray(yaml)
		?
		createFromArray()
		:
		[ createLevelFromIdentifierOrItem(yaml) ];

	for (const level of stack)
		level.stack = stack;

	return stack;

	function createFromArray() {
		return (
			yaml.some(Array.isArray)
			?
			yaml
			.filter(itemOrLevel => itemOrLevel)
			.map(createLevelFromIdentifierOrItemOrLevel)
			:
			[ createLevelFromIdentifierOrItemOrLevel(yaml) ]
		);
	}
}

function createLevelFromIdentifierOrItemOrLevel(
	identifierOrItemOrLevel,
) {
	return (
		Array.isArray(identifierOrItemOrLevel)
		?
		createLevelFromItems(identifierOrItemOrLevel)
		:
		createLevelFromIdentifierOrItem(identifierOrItemOrLevel)
	);
}

function createLevelFromItems(
	items,
) {
	const level =
		items
		.map(
			item =>
				isString(item)
				?
				{ id: item }
				:
				createItemFromObject(item),
		);

	for (const item of level)
		item.level = level;

	return level;
}

function createLevelFromIdentifierOrItem(
	identifierOrItem,
) {
	return (
		isString(identifierOrItem)
		?
		createLevelWhenIdentifier(identifierOrItem)
		:
		createLevel(createItemFromObject(identifierOrItem))
	);
}

function isString(
	value,
) {
	return typeof value === "string";
}

function createLevelWhenIdentifier(
	identifier,
) {
	return createLevel({ id: identifier });
}

function createLevel(
	item,
) {
	const level = [ item ];

	item.level = level;

	return level;
}

function createItemFromObject({
	dependsUpon,
	id,
	items,
	...restOfObject
}) {
	const item =
		{
			...id && { id },
			...dependsUpon && { dependsUpon: ensureIsArray(dependsUpon) },
			...restOfObject,
			...items && { items: createStackFromParsedYaml(items) },
		};

	if (item.items)
		item.items.parent = item;

	return item;
}

function ensureIsArray(
	item,
) {
	return (
		Array.isArray(item)
		?
		item
		:
		[ item ]
	);
}