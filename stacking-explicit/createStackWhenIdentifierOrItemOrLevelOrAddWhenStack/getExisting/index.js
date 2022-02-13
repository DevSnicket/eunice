/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import "core-js/features/array/flat";

import filterIdentifierOrItemOrLevelOrStack from "./filterIdentifierOrItemOrLevelOrStack";
import getIdentifierOrIdentifierOfItem from "../getIdentifierOrIdentifierOfItem";
import getIdentifiersInTargetLevelOrStack from "./getIdentifiersInTargetLevelOrStack";
import getStackOrSingleLevelOrSingleItem from "../getStackOrSingleLevelOrSingleItem";

export default ({
	identifierOrItemOrLevelOrStack,
	targetLevelOrStack,
}) =>
	identifierOrItemOrLevelOrStack
	&&
	getStackOrSingleLevelOrSingleItem(
		filterIdentifierOrItemOrLevelOrStack({
			identifierOrItemOrLevelOrStack,
			identifierOrItemPredicate:
				withTargetIdentifiers(
					new Set(
						getIdentifiersInTargetLevelOrStack(
							targetLevelOrStack,
						),
					),
				)
				.isIdentifierOrItemIncluded,
		}),
	);

function withTargetIdentifiers(
	targetIdentifiers,
) {
	return { isIdentifierOrItemIncluded };

	function isIdentifierOrItemIncluded(
		identifierOrItem,
	) {
		return (
			isIdentifierNotInTarget(
				getIdentifierOrIdentifierOfItem(
					identifierOrItem,
				),
			)
		);
	}

	function isIdentifierNotInTarget(
		identifier,
	) {
		return (
			identifier === "existing"
			||
			!targetIdentifiers.has(identifier)
		);
	}
}