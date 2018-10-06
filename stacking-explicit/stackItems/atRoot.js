/* istanbul ignore file: only used when JavaScript file is process entry point or from test harness */
const
	callWithYamlItemsAndOutputWhenProcessEntryPoint = require("../callWithYamlItemsAndOutputWhenProcessEntryPoint"),
	processorPlugins = require("../../Harnesses/processorPlugins"),
	stackItems = require(".");

callWithYamlItemsAndOutputWhenProcessEntryPoint(
	processArguments =>
		stackItems({
			identifierStack: splitCommaSeparatedLevels(processArguments.identifierStack),
			...processArguments,
		}),
);

processorPlugins.plugIn({
	action:
		({
			identifierStack,
			items,
		}) =>
			identifierStack
			?
			stackItems({
				identifierStack: splitCommaSeparatedLevels(identifierStack),
				items,
			})
			:
			items,
	parameter:
		{
			isMultiple: true,
			name: "identifierStack",
		},
	text:
		"stack root items",
});

function splitCommaSeparatedLevels(
	levels,
) {
	return levels.map(level => level.split(","));
}