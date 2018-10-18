/* istanbul ignore file: only used when JavaScript file is process entry point or from test harness */
const
	callWithYamlItemsAndOutputWhenProcessEntryPoint = require("../callWithYamlItemsAndOutputWhenProcessEntryPoint"),
	createStackWhenIdentifierOrItemOrLevelOrAddWhenStack = require("./createStackWhenIdentifierOrItemOrLevelOrAddWhenStack"),
	parseCommaSeparated = require("./parseCommaSeparated"),
	processorPlugins = require("../../Harnesses/processorPlugins"),
	replaceItemsAndInItems = require("./replaceItemsAndInItems");

callWithYamlItemsAndOutputWhenProcessEntryPoint(
	createOrAddToStacksUniformly,
);

processorPlugins.plugIn({
	action:
		createOrAddToStacksUniformly,
	parameter:
		{
			isMultiple: true,
			name: "commaSeparatedLevels",
		},
	text:
		"stack uniformly",
});

module.exports = createOrAddToStacksUniformly;

function createOrAddToStacksUniformly({
	commaSeparatedLevels,
	items,
}) {
	const identifiersInNewStack = parseCommaSeparated(commaSeparatedLevels);

	return (
		replaceItemsAndInItems({
			identifierOrItemOrLevelOrStack:
				items,
			replace:
				({ identifierOrItemOrLevelOrStack }) =>
					createStackWhenIdentifierOrItemOrLevelOrAddWhenStack({
						identifierOrItemOrLevelOrStack,
						identifiersInNewStack,
					}),
		})
	);
}