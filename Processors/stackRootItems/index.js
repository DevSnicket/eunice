const
	callWithYamlItemsAndOutputWhenProcessEntryPoint = require("../callWithYamlItemsAndOutputWhenProcessEntryPoint"),
	processorPlugins = require("../../Harnesses/processorPlugins");

/* istanbul ignore next: only used when JavaScript file is process entry point */
callWithYamlItemsAndOutputWhenProcessEntryPoint(
	processArguments =>
		stackRootItems({
			...processArguments,
			levels: splitCommaSeparatedLevels(processArguments.levels),
		}),
);

/* istanbul ignore next: only used from test harness */
processorPlugins.plugIn({
	action:
		({
			items,
			levels,
		}) =>
			levels
			?
			stackRootItems({
				items,
				levels: splitCommaSeparatedLevels(levels),
			})
			:
			items,
	parameter:
		{
			isMultiple: true,
			name: "levels",
		},
	text:
		"stack root items",
});

/* istanbul ignore next: only used when JavaScript file is process entry point or from test harness */
function splitCommaSeparatedLevels(
	levels,
) {
	return levels.map(level => level.split(","));
}

module.exports = stackRootItems;

function stackRootItems({
	items,
	levels,
}) {
	return (
		items
		&&
		(stackWhenMultipleRootItemsWithLevels() || items)
	);

	function stackWhenMultipleRootItemsWithLevels() {
		return (
			levels
			&&
			Array.isArray(items)
			&&
			stackMultipleRootItemsWithLevels()
		);
	}

	function stackMultipleRootItemsWithLevels() {
		const itemsByLevel = new Map();

		setItemsByLevel();

		return (
			[
				...getItemsForLevels(),
				...itemsByLevel.get(null) || [],
			]
		);

		function setItemsByLevel() {
			for (const item of items) {
				const stack =
					getStackOfItemIdentifier(item.id || item)
					||
					null;

				itemsByLevel.set(
					stack,
					[
						...itemsByLevel.get(stack) || [],
						item,
					],
				);
			}
		}

		function getItemsForLevels() {
			return (
				levels
				.map(
					level =>
						getItemWhenSingleOrCreateLevel(
							itemsByLevel.get(
								level,
							),
						),
				)
			);
		}
	}

	function getStackOfItemIdentifier(
		identifier,
	) {
		return levels.find(level => level.includes(identifier));
	}
}

function getItemWhenSingleOrCreateLevel(
	items,
) {
	return items.length === 1 ? items[0] : items;
}