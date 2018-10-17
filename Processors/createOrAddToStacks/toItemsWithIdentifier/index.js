/* istanbul ignore file: only used when JavaScript file is process entry point */
const
	callWithYamlItemsAndOutputWhenProcessEntryPoint = require("../../callWithYamlItemsAndOutputWhenProcessEntryPoint"),
	getIdentifierOrStackDescendantsUsingAncestors = require("../getIdentifierOrStackDescendantsUsingAncestors"),
	getIdentifiersToStackWhenParentAncestorIdentifier = require("./getIdentifiersToStackWhenParentAncestorIdentifier"),
	parseCommaSeparated = require("../parseCommaSeparated");

callWithYamlItemsAndOutputWhenProcessEntryPoint(
	createOrAddToStacksToItemsWithIdentifier,
);

module.exports = createOrAddToStacksToItemsWithIdentifier;

function createOrAddToStacksToItemsWithIdentifier({
	commaSeparatedLevels,
	items,
	toItemsWithIdentifier,
}) {
	const identifiersToStack = parseCommaSeparated(commaSeparatedLevels);

	return (
		getIdentifierOrStackDescendantsUsingAncestors({
			getIdentifiersToStackForAncestors:
				ancestors =>
					getIdentifiersToStackWhenParentAncestorIdentifier({
						ancestors,
						identifiersToStack,
						parentIdentifier: toItemsWithIdentifier,
					}),
			identifierOrItemOrLevelOrStack:
				items,
		})
	);
}