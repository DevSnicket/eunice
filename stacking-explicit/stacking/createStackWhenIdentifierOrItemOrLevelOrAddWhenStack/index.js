// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

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
				itemLookup.useItem(targetIdentifierOrItem)
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