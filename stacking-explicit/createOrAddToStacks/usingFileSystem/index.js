/* istanbul ignore file: only used when JavaScript file is process entry point */
const
	callWithYamlItemsAndOutputWhenProcessEntryPoint = require("../../callWithYamlItemsAndOutputWhenProcessEntryPoint"),
	createStackWhenIdentifierOrItemOrLevelOrAddWhenStack = require("../createStackWhenIdentifierOrItemOrLevelOrAddWhenStack"),
	getIdentifiersInNewStackForAncestorsAndDirectory = require("./getIdentifiersInNewStackForAncestorsAndDirectory"),
	replaceItemsAndInItems = require("../replaceItemsAndInItems");

callWithYamlItemsAndOutputWhenProcessEntryPoint(
	({
		directory,
		items,
		subsetIdentifierHierarchy,
	}) =>
		createOrAddToStacksUsingFileSystem({
			directory,
			items,
			subsetIdentifierHierarchy:
				typeof subsetIdentifierHierarchy === "string"
				?
				[ subsetIdentifierHierarchy ]
				:
				subsetIdentifierHierarchy,
		}),
);

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