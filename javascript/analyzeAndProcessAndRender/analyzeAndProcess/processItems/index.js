const createProcessFunctions = require("./createProcessFunctions");

module.exports =
	({
		directoryToCreateOrAddToStacksFrom,
		identifierSeparator,
		items,
		packagePrefixAndScope,
		rootItemIdentifier,
	}) =>
		invokeProcessFunctions({
			items,
			processFunctions:
				createProcessFunctions({
					directoryToCreateOrAddToStacksFrom,
					identifierSeparator,
					packagePrefixAndScope,
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