const getIdentifierOrItemOrStackLevelOrStack = require("./getIdentifierOrItemOrStackLevelOrStack");

module.exports =
	({
		getIdentifiersToStackForAncestors,
		identifierOrItemOrLevelOrStack,
	}) =>
		withGetIdentifiersToStackForAncestors(
			getIdentifiersToStackForAncestors,
		)
		.getIdentifierOrStackDescendants(
			identifierOrItemOrLevelOrStack,
		);

function withGetIdentifiersToStackForAncestors(
	getIdentifiersToStackForAncestors,
) {
	return withAncestors([]);

	function withAncestors(
		ancestors,
	) {
		return { getIdentifierOrStackDescendants };

		function getIdentifierOrStackDescendants(
			identifierOrItemOrLevelOrStack,
		) {
			return (
				stackWhenLevelOrStack()
				||
				getIdentifierOrStackItemsWhenItem(identifierOrItemOrLevelOrStack)
			);

			function stackWhenLevelOrStack() {
				return (
					Array.isArray(identifierOrItemOrLevelOrStack)
					&&
					stackLevelOrStack(identifierOrItemOrLevelOrStack)
				);
			}
		}

		function stackLevelOrStack(
			levelOrStack,
		) {
			return (
				(stackWhenFileExists() || levelOrStack)
				.map(getIdentifierOrStackItemsWhenItemOrLevel)
			);

			function stackWhenFileExists() {
				const identifiersToStack = getIdentifiersToStackForAncestors(ancestors);

				return (
					identifiersToStack
					&&
					getIdentifierOrItemOrStackLevelOrStack({
						identifierOrItemOrLevelOrStack: levelOrStack,
						identifiersToStack,
					})
				);
			}
		}

		function getIdentifierOrStackItemsWhenItemOrLevel(
			identifierOrItemOrLevel,
		) {
			return (
				Array.isArray(identifierOrItemOrLevel)
				?
				identifierOrItemOrLevel.map(getIdentifierOrStackItemsWhenItem)
				:
				getIdentifierOrStackItemsWhenItem(identifierOrItemOrLevel)
			);
		}

		function getIdentifierOrStackItemsWhenItem(
			identifierOrItem,
		) {
			return (
				getWhenIdentifier()
				||
				stackItemsOfItem(identifierOrItem)
			);

			function getWhenIdentifier() {
				return (
					typeof identifierOrItem === "string"
					&&
					identifierOrItem
				);
			}
		}

		function stackItemsOfItem(
			item,
		) {
			return (
				{
					...item,
					...getItemsPropertyStackedWhenItemIdentifiable(),
				}
			);

			function getItemsPropertyStackedWhenItemIdentifiable() {
				return (
					item.id
					&&
					item.items
					&&
					{ items: stackItems() }
				);
			}

			function stackItems() {
				return (
					withAncestors(
						[ ...ancestors, item ],
					)
					.getIdentifierOrStackDescendants(
						item.items,
					)
				);
			}
		}
	}
}