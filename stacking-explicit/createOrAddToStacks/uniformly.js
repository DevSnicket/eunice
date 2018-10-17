/* istanbul ignore file: only used when JavaScript file is process entry point or from test harness */
const
	callWithYamlItemsAndOutputWhenProcessEntryPoint = require("../callWithYamlItemsAndOutputWhenProcessEntryPoint"),
	getIdentifierOrStackDescendantsUsingAncestors = require("./getIdentifierOrStackDescendantsUsingAncestors"),
	parseCommaSeparated = require("./parseCommaSeparated"),
	processorPlugins = require("../../Harnesses/processorPlugins");

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
	const identifiersToStack = parseCommaSeparated(commaSeparatedLevels);

	return (
		getIdentifierOrStackDescendantsUsingAncestors({
			getIdentifiersToStackForAncestors: () => identifiersToStack,
			identifierOrItemOrLevelOrStack: items,
		})
	);
}