// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const mapTargetLevelOrStack = require("./mapTargetLevelOrStack");

module.exports =
	({
		addNewInTarget,
		getLevelOrStackForTargetIdentifierOrItem,
		targetLevelOrStack,
	}) =>
		addNewInTarget
		?
		withGetItemOrLevelOrStackForTargetLevelOrStack(getLevelOrStackForTargetIdentifierOrItem)
		.mapAndCreateNewInTargetLevelOrStack(targetLevelOrStack)
		:
		mapTargetLevelOrStack({
			getLevelOrStackForTargetIdentifierOrItem,
			targetLevelOrStack,
		});

function withGetItemOrLevelOrStackForTargetLevelOrStack(
	getLevelOrStackForTargetIdentifierOrItem,
) {
	return { mapAndCreateNewInTargetLevelOrStack };

	function mapAndCreateNewInTargetLevelOrStack(
		targetLevelOrStack,
	) {
		return (
			mapTargetLevelOrStack({
				getLevelOrStackForTargetIdentifierOrItem:
					getOrCreateNewLevelOrStackForTargetIdentifierOrItem,
				targetLevelOrStack,
			})
		);
	}

	function getOrCreateNewLevelOrStackForTargetIdentifierOrItem(
		targetIdentifierOrItem,
	) {
		return (
			getLevelOrStackForTargetIdentifierOrItem(targetIdentifierOrItem)
			||
			createNew()
		);

		function createNew() {
			return (
				whenHasItems()
				||
				targetIdentifierOrItem
			);

			function whenHasItems() {
				return (
					targetIdentifierOrItem.items
					&&
					{
						...targetIdentifierOrItem,
						items: mapAndCreateItems(),
					}
				);

				function mapAndCreateItems() {
					return (
						Array.isArray(targetIdentifierOrItem.items)
						?
						mapAndCreateNewInTargetLevelOrStack(
							targetIdentifierOrItem.items,
						)
						:
						getOrCreateNewLevelOrStackForTargetIdentifierOrItem(
							targetIdentifierOrItem.items,
						)
					);
				}
			}
		}
	}
}