module.exports =
	newLevels => {
		const existingIdentifier = "existing";

		const itemsByNewLevel = new Map();

		return (
			{
				addIdentifierOrItemWhenInNewLevel,
				getNewWithExistingLevels,
			}
		);

		function getNewWithExistingLevels(
			exisitingLevels,
		) {
			throwErrorWhenExistingNotSpecified();

			return (
				itemsByNewLevel.size
				?
				newLevels.reduce(aggregate, [])
				:
				getExistingWhenNoNewLevels()
			);

			function throwErrorWhenExistingNotSpecified() {
				if (exisitingLevels.length && !newLevels.some(isNewLevelForExisting))
					throw Error(`Single item level of "${existingIdentifier}" not specified in "${newLevels}".`);
			}

			function aggregate(
				stack,
				identifiersInNewLevel,
			) {
				if (isNewLevelForExisting(identifiersInNewLevel))
					return (
						[
							...stack,
							...exisitingLevels,
						]
					);
				else {
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

			function isNewLevelForExisting(
				newLevel,
			) {
				return (
					Array.isArray(newLevel)
					?
					newLevel.length === 1 && newLevel[0] === existingIdentifier
					:
					newLevel === existingIdentifier
				);
			}

			function getExistingWhenNoNewLevels() {
				return (
					exisitingLevels.length === 1
					?
					exisitingLevels[0]
					:
					exisitingLevels
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