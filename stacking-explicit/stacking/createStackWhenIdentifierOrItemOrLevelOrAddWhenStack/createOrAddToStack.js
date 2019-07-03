/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		addIdentifierOrItemWhenInNewLevel,
		getNewWithExistingLevels,
		levelOrStack,
	}) => {
		return (
			levelOrStack.some(Array.isArray)
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