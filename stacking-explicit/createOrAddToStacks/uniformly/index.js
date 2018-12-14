const
	createStackWhenIdentifierOrItemOrLevelOrAddWhenStack = require("../createStackWhenIdentifierOrItemOrLevelOrAddWhenStack"),
	processorPlugins = require("@devsnicket/eunice-test-harnesses-processor-plugins"),
	replaceItemsAndInItems = require("../replaceItemsAndInItems");

processorPlugins.plugIn({
	action:
		createOrAddToStacksUniformly,
	parameter:
		{
			isMultiple: true,
			name: "commaSeparatedLevels",
		},
	text:
		"stack uniformly",
});

module.exports = createOrAddToStacksUniformly;

function createOrAddToStacksUniformly({
	identifiersInNewStack,
	items,
}) {
	return (
		replaceItemsAndInItems({
			identifierOrItemOrLevelOrStack:
				items,
			replace:
				({ identifierOrItemOrLevelOrStack }) =>
					createStackWhenIdentifierOrItemOrLevelOrAddWhenStack({
						identifierOrItemOrLevelOrStack,
						identifiersInNewStack,
					}),
		})
	);
}