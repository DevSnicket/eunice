const
	callWithYamlItemsAndOutputWhenProcessEntryPoint = require("../callWithYamlItemsAndOutputWhenProcessEntryPoint"),
	createStackFromYaml = require("../../dependencyAndStructure/createStackFromYaml"),
	createYamlFromStack = require("../../dependencyAndStructure/createYamlFromStack"),
	processorPlugins = require("../../Harnesses/processorPlugins");

callWithYamlItemsAndOutputWhenProcessEntryPoint(
	removeRedundantParentIdentifierPrefix,
);

processorPlugins.plugIn({
	action: removeRedundantParentIdentifierPrefix,
	parameter: { name: "identifierSeparator" },
	text: "remove redundant identifier prefix of parent and separator",
});

module.exports = removeRedundantParentIdentifierPrefix;

function removeRedundantParentIdentifierPrefix({
	identifierSeparator,
	items,
}) {
	return (
		createYamlFromStack(
			withGetIdentifierWithoutParentWhenPrefixed(
				({
					identifier,
					parentIdentifier,
				}) =>
					getIdentifierWithoutParentAndSeparatorWhenPrefixed({
						identifier,
						identifierSeparator,
						parentIdentifier,
					}),
			)
			.createStack(
				createStackFromYaml(items),
			),
		)
	);
}

function getIdentifierWithoutParentAndSeparatorWhenPrefixed({
	identifier,
	identifierSeparator,
	parentIdentifier,
}) {
	return isPrefixed() && cropPrefixFromStart();

	function isPrefixed() {
		return parentIdentifier && identifier.startsWith(parentIdentifier + identifierSeparator);
	}

	function cropPrefixFromStart() {
		return identifier.substring(parentIdentifier.length + identifierSeparator.length);
	}
}

function withGetIdentifierWithoutParentWhenPrefixed(
	getIdentifierWithoutParentWhenPrefixed,
) {
	return { createStack };

	function createStack(
		stack,
	) {
		return stack.map(level => level.map(createItem));
	}

	function createItem({
		dependsUpon,
		id: identifier,
		items,
		...restOfItem
	}) {
		return (
			{
				...getIdentifierProperty({
					identifier,
					parent: getParentOfItem(restOfItem),
				}),
				dependsUpon:
					createDependsUpon(),
				...restOfItem,
				items:
					createItems(),
			}
		);

		function createDependsUpon() {
			return (
				dependsUpon
				&&
				dependsUpon.map(
					dependUpon =>
						typeof dependUpon === "string"
						?
						dependUpon
						:
						createDependsUponItem(dependUpon),
				)
			);
		}

		function createItems() {
			return items && createStack(items);
		}
	}

	function createDependsUponItem({
		id: identifier,
		...restOfItem
	}) {
		return (
			{
				...getIdentifierProperty({
					identifier,
					parent: getParentOfItem(restOfItem),
				}),
				...restOfItem,
			}
		);
	}

	function getParentOfItem(
		item,
	) {
		return item.level.stack.parent;
	}

	function getIdentifierProperty({
		identifier,
		parent,
	}) {
		return (
			{
				id:
					getIdentifierWithoutPrefix()
					||
					identifier,
			}
		);

		function getIdentifierWithoutPrefix() {
			return (
				identifier
				&&
				parent
				&&
				getIdentifierWithoutParentWhenPrefixed({
					identifier,
					parentIdentifier: parent.id,
				})
			);
		}
	}
}