// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const createProcessFunctions = require("./createProcessFunctions");

module.exports =
	({
		dependencyPermeableIdentifiers,
		directoryToCreateOrAddToStacksFrom,
		identifierOrItemOrLevelOrStack,
		isInferStacksEnabled,
		modifyStacksFile,
		packagePrefixAndScope,
		rootItemIdentifier,
	}) =>
		invokeProcessFunctions({
			identifierOrItemOrLevelOrStack,
			processFunctions:
				createProcessFunctions({
					dependencyPermeableIdentifiers,
					directoryToCreateOrAddToStacksFrom,
					isInferStacksEnabled,
					modifyStacksFile,
					packagePrefixAndScope,
					rootItemIdentifier,
				}),
		});

function invokeProcessFunctions({
	identifierOrItemOrLevelOrStack,
	processFunctions,
}) {
	return (
		processFunctions.reduce(
			(identifierOrItemOrLevelOrStackAggregation, processFunction) =>
				processFunction(identifierOrItemOrLevelOrStackAggregation),
			identifierOrItemOrLevelOrStack,
		)
	);
}