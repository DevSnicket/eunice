module.exports =
	({
		addMissing,
		identifiersInNewStack,
	}) => {
		const existingIdentifier = "existing";

		const itemsByIdentifiersInNewLevel = new Map();

		return (
			{
				addIdentifierOrItemWhenInNewLevel,
				getNewWithExistingLevels,
			}
		);

		function getNewWithExistingLevels(
			existingLevels,
		) {
			throwErrorWhenExistingNotSpecified();

			return (
				itemsByIdentifiersInNewLevel.size || addMissing
				?
				identifiersInNewStack.reduce(aggregate, [])
				:
				getExistingWhenNoNewLevels()
			);

			function throwErrorWhenExistingNotSpecified() {
				if (existingLevels.length && !identifiersInNewStack.some(isNewLevelForExisting))
					throw Error(`Single item level of "${existingIdentifier}" not specified in new stack "${identifiersInNewStack}".`);
			}

			function aggregate(
				stack,
				identifiersInNewLevel,
			) {
				return whenExisting() || asNew();

				function whenExisting() {
					return (
						isNewLevelForExisting(identifiersInNewLevel)
						&&
						[
							...stack,
							...existingLevels,
						]
					);
				}

				function asNew() {
					const level =
						itemsByIdentifiersInNewLevel.get(
							identifiersInNewLevel,
						)
						||
						(addMissing && createMissingLevel());

					return (
						level
						?
						[ ...stack, level ]
						:
						stack
					);
				}

				function createMissingLevel() {
					return (
						Array.isArray(identifiersInNewLevel)
						?
						identifiersInNewLevel
						:
						[ identifiersInNewLevel ]
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
					existingLevels.length === 1
					?
					existingLevels[0]
					:
					existingLevels
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
				itemsByIdentifiersInNewLevel.set(
					newLevel,
					[
						...itemsByIdentifiersInNewLevel.get(newLevel) || [],
						identifierOrItem,
					],
				);
			}
		}

		function getNewLevelOfIdentifierWhenSpecified(
			identifier,
		) {
			return (
				identifiersInNewStack.find(
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