/* istanbul ignore file: only used when JavaScript file is process entry point */
const
	callWithYamlItemsAndOutputWhenProcessEntryPoint = require("../../callWithYamlItemsAndOutputWhenProcessEntryPoint"),
	createStackWhenIdentifierOrItemOrLevelOrAddWhenStack = require("../createStackWhenIdentifierOrItemOrLevelOrAddWhenStack"),
	getIdentifiersInNewStackForAncestorsAndDirectory = require("./getIdentifiersInNewStackForAncestorsAndDirectory"),
	replaceItemsAndInItems = require("../replaceItemsAndInItems");

callWithYamlItemsAndOutputWhenProcessEntryPoint(createOrAddToStacksUsingFileSystem);

module.exports = createOrAddToStacksUsingFileSystem;

function createOrAddToStacksUsingFileSystem({
	directory,
	items,
	subsetIdentifierHierarchy,
}) {
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
							getIdentifiersInNewStackForAncestorsAndDirectory({
								ancestors,
								directory,
								subsetIdentifierHierarchy,
							}),
					}),
		})
	);
}