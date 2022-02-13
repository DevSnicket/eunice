/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import mapTargetLevelOrStack from "./mapTargetLevelOrStack";

export default ({
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
				||
				[]
			);

			function whenHasItems() {
				return (
					targetIdentifierOrItem
					&&
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