module.exports =
	({
		addIdentifierOrItemWhenInNewLevel,
		getNewLevels,
		levelOrStack,
	}) => {
		return (
			Array.isArray(levelOrStack[0])
			?
			appendToStack()
			:
			createStack()
		);

		function appendToStack() {
			return (
				[
					...levelOrStack.reduce(aggregateLevel, []),
					...getNewLevels(),
				]
			);

			function aggregateLevel(
				levelsWithItemsNotStacked,
				level,
			) {
				const itemsNotStacked =
					level.filter(item => !addIdentifierOrItemWhenInNewLevel(item));

				return (
					[
						...levelsWithItemsNotStacked,
						...itemsNotStacked.length ? [ itemsNotStacked ] : [],
					]
				);
			}
		}

		function createStack() {
			const itemsNotInLevel =
				levelOrStack
				.filter(
					item => !addIdentifierOrItemWhenInNewLevel(item),
				);

			return (
				[
					...getNewLevels(),
					...itemsNotInLevel,
				]
			);
		}
	};