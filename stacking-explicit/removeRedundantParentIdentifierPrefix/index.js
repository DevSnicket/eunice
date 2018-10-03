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
		return (
			stack.map(
				level =>
					removeDuplicateItemsOrThrowWhenNotRedundant(
						level.map(removeFromItem),
					),
			)
		);
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

function removeDuplicateItemsOrThrowWhenNotRedundant(
	items,
) {
	const removedItems = new Set();

	return items.filter(item => !isDuplicateItemOrThrowWhenNotRedundant(item));

	function isDuplicateItemOrThrowWhenNotRedundant(
		item,
	) {
		if (isDuplicate()) {
			const errorMessage =
				getErrorMessage();

			if (errorMessage)
				throw Error(`Item with duplicate identifier ${errorMessage}.`);
			else {
				removedItems.add(item);

				return true;
			}
		} else
			return false;

		function isDuplicate() {
			return (
				items.some(
					otherItem =>
						otherItem !== item
						&&
						otherItem.id === item.id
						&&
						!removedItems.has(otherItem),
				)
			);
		}

		function getErrorMessage() {
			return (
				[ forDependsUpon(), forRelevantProperties() ]
				.filter(message => message)
				.join(" and ")
			);

			function forDependsUpon() {
				return (
					(!item.dependsUpon && "does not depend upon any items")
					||
					(item.dependsUpon.length !== 1 && "does not depend upon a single item")
					||
					(item.id !== item.dependsUpon[0].id && "does not depend upon an item with same identifier")
				);
			}

			function forRelevantProperties() {
				return formatRelevantProperties(getRelevantProperties());

				function getRelevantProperties() {
					const buildInProperties = [ "dependsUpon", "id", "items", "level" ];

					return (
						Object.keys(item)
						.filter(property => !buildInProperties.includes(property))
					);
				}

				function formatRelevantProperties(
					relevantProperties,
				) {
					return (
						relevantProperties.length && `has relevant properties (${relevantProperties})`
					);
				}
			}
		}
	}
}