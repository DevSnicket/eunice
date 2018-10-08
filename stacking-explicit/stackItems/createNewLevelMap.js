module.exports =
	newLevels => {
		const itemsByNewLevel = new Map();

		return (
			{
				addIdentifierOrItemWhenInNewLevel,
				getNewLevels,
			}
		);

		function getNewLevels() {
			return newLevels.reduce(aggregate, []);

			function aggregate(
				stack,
				identifiersInNewLevel,
			) {
				const level =
					itemsByNewLevel.get(
						identifiersInNewLevel,
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

		function addIdentifierOrItemWhenInNewLevel(
			identifierOrItem,
		) {
			const newLevel =
				getNewLevelOfIdentifierWhenSpecified(
					identifierOrItem.id
					||
					identifierOrItem,
				);

			if (newLevel)
				addItemToIdentifiersInLevel();

			return newLevel;

			function addItemToIdentifiersInLevel() {
				itemsByNewLevel.set(
					newLevel,
					[
						...itemsByNewLevel.get(newLevel) || [],
						identifierOrItem,
					],
				);
			}
		}

		function getNewLevelOfIdentifierWhenSpecified(
			identifier,
		) {
			return (
				newLevels.find(
					newLevel =>
						Array.isArray(newLevel)
						?
						newLevel.includes(identifier)
						:
						newLevel === identifier,
				)
			);
		}
	};