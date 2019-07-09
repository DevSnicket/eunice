/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createItemLookup = require("./createItemLookup"),
	getExisting = require("./getExisting"),
	getLevelOrStackForTargetIdentifier = require("./getLevelOrStackForTargetIdentifier"),
	getStackForTargetLevelOrStack = require("./getStackForTargetLevelOrStack"),
	getStackOrSingleLevelOrSingleItem = require("./getStackOrSingleLevelOrSingleItem"),
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

		const stackForTarget =
			getStackForTargetLevelOrStack({
				getLevelOrStackForTargetIdentifier:
					targetIdentifier =>
						getLevelOrStackForTargetIdentifier({
							addNewInTarget,
							getExisting:
								existingFactory.getExisting,
							getItemWithIdentifier:
								itemLookup.getItemWithIdentifier,
							targetIdentifier,
						}),
				targetLevelOrStack,
			});

		if (!existingFactory.hasExisting)
			throwErrorWhenIdentifiersNotUsed({
				identifiersNotUsed: itemLookup.getIdentifiersNotUsed(),
				targetLevelOrStack,
			});

		return (
			stackForTarget.length
			?
			getStackOrSingleLevelOrSingleItem(stackForTarget)
			:
			null
		);

		function createExistingFactory() {
			let hasExisting = false;

			return (
				{
					getExisting: getExistingAndSetFlag,
					get hasExisting() {
						return hasExisting;
					},
				}
			);

			function getExistingAndSetFlag() {
				hasExisting = true;

				return (
					getExisting({
						identifierOrItemOrLevelOrStack,
						targetLevelOrStack,
					})
				);
			}
		}
	};