const createProcessFunctions = require("./createProcessFunctions");

module.exports =
	({
		directoryToCreateOrAddToStacksFrom,
		identifierSeparator,
		items,
		rootItemIdentifier,
	}) =>
		invokeProcessFunctions({
			items,
			processFunctions:
				createProcessFunctions({
					directoryToCreateOrAddToStacksFrom,
					identifierSeparator,
					rootItemIdentifier,
				}),
		});

function invokeProcessFunctions({
	items,
	processFunctions,
}) {
	return (
		processFunctions.reduce(
			(itemsAggregation, processFunction) =>
				processFunction(itemsAggregation),
			items,
		)
	);
}