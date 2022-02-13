/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createItemLookup from "./createItemLookup";
import getExisting from "./getExisting";
import mapAndCreateNewInTargetLevelOrStack from "./mapAndCreateNewInTargetLevelOrStack";
import throwErrorWhenIdentifiersNotUsed from "./throwErrorWhenIdentifiersNotUsed";

export default ({
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