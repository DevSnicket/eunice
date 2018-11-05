const
	callWithYamlInputAndOutputWhenProcessEntryPoint = require("../callWithYamlInputAndOutputWhenProcessEntryPoint"),
	{ createStackFromYaml, createYamlFromStack } = require("@devsnicket/eunice-dependency-and-structure"),
	processorPlugins = require("../../Harnesses/processorPlugins");

callWithYamlInputAndOutputWhenProcessEntryPoint(
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
			.removeFromStack(
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
	return { removeFromStack };

	function removeFromStack(
		stack,
	) {
		return stack.map(level => level.map(removeFromItem));
	}

	function removeFromItem({
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
					removeFromDependsUpon(),
				...restOfItem,
				items:
					removeFromItems(),
			}
		);

		function removeFromDependsUpon() {
			return (
				dependsUpon
				&&
				dependsUpon.map(
					dependUpon =>
						typeof dependUpon === "string"
						?
						dependUpon
						:
						removeFromDependsUponItem(dependUpon),
				)
			);
		}

		function removeFromItems() {
			return items && removeFromStack(items);
		}
	}

	function removeFromDependsUponItem({
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