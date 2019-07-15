/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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