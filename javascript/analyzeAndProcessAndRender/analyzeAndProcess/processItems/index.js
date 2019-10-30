// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const createProcessFunctions = require("./createProcessFunctions");

module.exports =
	({
		dependencyPermeableIdentifiers,
		directoryToCreateOrAddToStacksFrom,
		identifierSeparator,
		isFileContentReversed,
		items,
		modifyStacksFile,
		packagePrefixAndScope,
		rootItemIdentifier,
	}) =>
		invokeProcessFunctions({
			items,
			processFunctions:
				createProcessFunctions({
					dependencyPermeableIdentifiers,
					directoryToCreateOrAddToStacksFrom,
					identifierSeparator,
					isFileContentReversed,
					modifyStacksFile,
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