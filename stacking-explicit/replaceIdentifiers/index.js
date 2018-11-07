require("array.prototype.flat")
.shim();

const
	callWithYamlInputAndOutputWhenProcessEntryPoint = require("../callWithYamlInputAndOutputWhenProcessEntryPoint"),
	{ createStackFromYaml, createYamlFromStack } = require("@devsnicket/eunice-dependency-and-structure"),
	processorPlugins = require("../../Renderer/harness/processorPlugins");

/* istanbul ignore next: only used when JavaScript file is process entry point */
callWithYamlInputAndOutputWhenProcessEntryPoint(
	({
		items,
		pattern,
		replacement,
		rootOnly,
	}) =>
		replaceIdentifiers({
			items,
			pattern: new RegExp(pattern),
			replacement,
			rootOnly,
		}),
);

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