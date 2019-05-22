const createProcessFunctions = require("./createProcessFunctions");

module.exports =
	({
		directoryToCreateOrAddToStacksFrom,
		identifierPrefixOfRootItems,
		identifierSeparator,
		items,
	}) =>
		invokeProcessFunctions({
			items,
			processFunctions:
				createProcessFunctions({
					directoryToCreateOrAddToStacksFrom,
					identifierPrefixOfRootItems,
					identifierSeparator,
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