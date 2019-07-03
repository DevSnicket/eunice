/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

require("array.prototype.flat")
.shim();

const getStackOrSingleLevelOrSingleItem = require("./getStackOrSingleLevelOrSingleItem");

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
				getStackOrSingleLevelOrSingleItem(
					identifiersInNewStack.reduce(aggregate, []),
				)
				:
				getExistingWhenNoNewLevels()
			);

			function throwErrorWhenExistingNotSpecified() {
				if (existingLevels.length && !identifiersInNewStack.some(isNewLevelForExisting))
					throw Error(`Neither the following items were specified ${formatExistingLevels()}, nor was a single item level of "${existingIdentifier}", in new the stack "${identifiersInNewStack}".`);

				function formatExistingLevels() {
					return (
						existingLevels
						.flat()
						.map(existing => `"${existing.id || existing}"`)
						.join(", ")
					);
				}
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