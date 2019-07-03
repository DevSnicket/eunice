/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

require("array.prototype.flat")
.shim();

const { createStackFromYaml, createYamlFromStack } = require("@devsnicket/eunice-dependency-and-structure");

module.exports =
	({
		items,
		pattern,
		replacement,
		rootOnly,
	}) =>
		items
		&&
		updateItems({
			items,
			rootOnly,
			updateItem: item => replaceInItem({ item, pattern, replacement }),
		});

function updateItems({
	items,
	rootOnly,
	updateItem,
}) {
	const stack = createStackFromYaml(items);

	if (rootOnly)
		for (const item of getItemsOfStack(stack))
			updateItem(item);
	else
		withUpdateItem(updateItem)
		.updateInStack(stack);

	return createYamlFromStack(stack);
}

function withUpdateItem(
	updateItem,
) {
	return { updateInStack };

	function updateInStack(
		stack,
	) {
		for (const item of getItemsOfStack(stack)) {
			updateItem(item);

			if (item.items)
				updateInStack(item.items);
		}
	}
}

function getItemsOfStack(
	stack,
) {
	return stack.flat(2);
}

function replaceInItem({
	item,
	pattern,
	replacement,
}) {
	item.id = (item.id || "").replace(pattern, replacement);
}