require("array.prototype.flat")
.shim();

const
	{ createStackFromYaml, createYamlFromStack } = require("@devsnicket/eunice-dependency-and-structure"),
	processorPlugins = require("@devsnicket/eunice-test-harnesses-processor-plugins");

processorPlugins.plugIn({
	action: replaceIdentifiers,
	parameter: { name: "prefix" },
	text: "replace identifiers",
});

module.exports = replaceIdentifiers;

function replaceIdentifiers({
	items,
	pattern,
	replacement,
	rootOnly,
}) {
	return (
		items
		&&
		updateItems({
			items,
			rootOnly,
			updateItem: item => replaceInItem({ item, pattern, replacement }),
		})
	);
}

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