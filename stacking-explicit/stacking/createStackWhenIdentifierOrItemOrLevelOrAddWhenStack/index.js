/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createItemLookup = require("./createItemLookup"),
	getExisting = require("./getExisting"),
	mapAndCreateNewInTargetLevelOrStack = require("./mapAndCreateNewInTargetLevelOrStack"),
	throwErrorWhenIdentifiersNotUsed = require("./throwErrorWhenIdentifiersNotUsed");

module.exports =
	({
		addNewInTarget = false,
		identifierOrItemOrLevelOrStack,
		targetLevelOrStack,
	}) => {
		const
			existingFactory = createExistingFactory(),
			itemLookup = createItemLookup(identifierOrItemOrLevelOrStack);

		const itemOrLevelOrStackForTarget =
			mapAndCreateNewInTargetLevelOrStack({
				addNewInTarget,
				getLevelOrStackForTargetIdentifierOrItem,
				targetLevelOrStack,
			});

		if (!existingFactory.hasExisting)
			throwErrorWhenIdentifiersNotUsed({
				identifiersNotUsed: itemLookup.getIdentifiersNotUsed(),
				targetLevelOrStack,
			});

		return itemOrLevelOrStackForTarget;

		function getLevelOrStackForTargetIdentifierOrItem(
			targetIdentifierOrItem,
		) {
			return (
				existingFactory.getWhenIsExisting(targetIdentifierOrItem)
				||
				itemLookup.getItemWithIdentifier(targetIdentifierOrItem)
			);
		}

		function createExistingFactory() {
			let hasExisting = false;

			return (
				{
					getWhenIsExisting,
					get hasExisting() {
						return hasExisting;
					},
				}
			);

			function getWhenIsExisting(
				targetIdentifierOrItem,
			) {
				return isExisting() && getExistingAndSetFlag();

				function isExisting() {
					return targetIdentifierOrItem === "existing";
				}
			}

			function getExistingAndSetFlag() {
				hasExisting = true;

				return (
					getExisting({
						identifierOrItemOrLevelOrStack,
						targetLevelOrStack,
					})
					||
					[]
				);
			}
		}
	};