/* istanbul ignore file: only used when JavaScript file is process entry point */
const
	callWithYamlItemsAndOutputWhenProcessEntryPoint = require("../../callWithYamlItemsAndOutputWhenProcessEntryPoint"),
	createStackWhenIdentifierOrItemOrLevelOrAddWhenStack = require("../createStackWhenIdentifierOrItemOrLevelOrAddWhenStack"),
	getIdentifiersInNewStackWhenParentAncestor = require("./getIdentifiersInNewStackWhenParentAncestor"),
	parseCommaSeparated = require("../parseCommaSeparated"),
	replaceItemsAndInItems = require("../replaceItemsAndInItems");

callWithYamlItemsAndOutputWhenProcessEntryPoint(
	createOrAddToStacksToItemsWithIdentifier,
);

module.exports = createOrAddToStacksToItemsWithIdentifier;

function createOrAddToStacksToItemsWithIdentifier({
	commaSeparatedLevels,
	items,
	toIdentifier,
}) {
	const identifiersInNewStack = parseCommaSeparated(commaSeparatedLevels);

	return (
		replaceItemsAndInItems({
			identifierOrItemOrLevelOrStack:
				items,
			replace:
				({
					ancestors,
					identifierOrItemOrLevelOrStack,
				}) =>
					createStackWhenIdentifierOrItemOrLevelOrAddWhenStack({
						addMissing:
							true,
						identifierOrItemOrLevelOrStack,
						identifiersInNewStack:
							getIdentifiersInNewStackWhenParentAncestor({
								ancestors,
								identifiersInNewStack,
								parentIdentifier: toIdentifier,
							}),
					}),
		})
	);
}