module.exports =
	({
		addIdentifierOrItemWhenInNewLevel,
		getNewWithExistingLevels,
		levelOrStack,
	}) => {
		return (
			Array.isArray(levelOrStack[0])
			?
			addToStack()
			:
			createStack()
		);

		function addToStack() {
			return (
				getNewWithExistingLevels(
					levelOrStack.reduce(aggregateIdentifierOrItemOrLevel, []),
				)
			);

			function aggregateIdentifierOrItemOrLevel(
				levelsWithItemsNotStacked,
				identifierOrItemOrLevel,
			) {
				return (
					Array.isArray(identifierOrItemOrLevel)
					?
					asLevel()
					:
					asIdentifierOrItem()
				);

				function asLevel() {
					return (
						[
							...levelsWithItemsNotStacked,
							...addIdentifiersAndItemsInNewLevelAndGetLevelWhenAnyNotStacked(identifierOrItemOrLevel),
						]
					);
				}

				function asIdentifierOrItem() {
					return (
						addIdentifierOrItemWhenInNewLevel(identifierOrItemOrLevel)
						?
						levelsWithItemsNotStacked
						:
						[
							...levelsWithItemsNotStacked,
							identifierOrItemOrLevel,
						]
					);
				}
			}
		}

		function createStack() {
			return (
				getNewWithExistingLevels(
					[
						...addIdentifiersAndItemsInNewLevelAndGetLevelWhenAnyNotStacked(
							levelOrStack,
						),
					],
				)
			);
		}

		function * addIdentifiersAndItemsInNewLevelAndGetLevelWhenAnyNotStacked(
			identifiersAndItems,
		) {
			const itemsNotStacked =
				identifiersAndItems
				.filter(
					identifierOrItem =>
						!addIdentifierOrItemWhenInNewLevel(identifierOrItem),
				);

			if (itemsNotStacked.length)
				yield itemsNotStacked;
		}
	};