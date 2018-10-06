module.exports =
	({
		identifierStack,
		items,
	}) => {
		return (
			items
			&&
			(stackWhenMultipleRootItemsWithLevels() || items)
		);

		function stackWhenMultipleRootItemsWithLevels() {
			return (
				identifierStack
				&&
				Array.isArray(items)
				&&
				stackMultipleRootItemsWithLevels()
			);
		}

		function stackMultipleRootItemsWithLevels() {
			const itemsByIdentifierLevel = new Map();

			setItemsByIdentifierLevel();

			return (
				[
					...getStackFromItemsByIdentifierLevel(),
					...itemsByIdentifierLevel.get(null) || [],
				]
			);

			function setItemsByIdentifierLevel() {
				for (const item of items) {
					const stack =
						getStackOfItemIdentifier(item.id || item)
						||
						null;

					itemsByIdentifierLevel.set(
						stack,
						[
							...itemsByIdentifierLevel.get(stack) || [],
							item,
						],
					);
				}
			}

			function getStackFromItemsByIdentifierLevel() {
				return identifierStack.reduce(aggregate, []);

				function aggregate(
					stack,
					identifierLevel,
				) {
					const level =
						itemsByIdentifierLevel.get(
							identifierLevel,
						);

					return (
						level
						?
						[ ...stack, level ]
						:
						stack
					);
				}
			}
		}

		function getStackOfItemIdentifier(
			identifier,
		) {
			return identifierStack.find(level => level.includes(identifier));
		}
	};