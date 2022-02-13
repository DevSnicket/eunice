/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createTestItemWithIdentifier from "../createTestItemWithIdentifier";
import getExisting from ".";

const
	leftInTarget = createTestItemWithIdentifier("leftInTarget"),
	lowerInTarget = createTestItemWithIdentifier("lowerInTarget"),
	lowerNotInTarget = createTestItemWithIdentifier("lowerNotInTarget"),
	rightInTarget = createTestItemWithIdentifier("rightInTarget"),
	upperInTarget = createTestItemWithIdentifier("upperInTarget"),
	upperNotInTarget = createTestItemWithIdentifier("upperNotInTarget");

test.each(
	[
		[
			{
				identifierOrItemOrLevelOrStack: null,
				targetLevelOrStack: null,
			},
			null,
		],
		[
			{
				identifierOrItemOrLevelOrStack: null,
				targetLevelOrStack: [ null ],
			},
			null,
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ leftInTarget, rightInTarget ],
				targetLevelOrStack: [ "leftInTarget", "rightInTarget" ],
			},
			null,
		],
		[
			{
				identifierOrItemOrLevelOrStack: "notInTarget",
				targetLevelOrStack: [ ],
			},
			"notInTarget",
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ [ upperNotInTarget ], lowerNotInTarget ],
				targetLevelOrStack: [ ],
			},
			[ [ upperNotInTarget ], [ lowerNotInTarget ] ],
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ [ upperInTarget ], lowerInTarget ],
				targetLevelOrStack: [ "upperInTarget", "lowerInTarget" ],
			},
			null,
		],
	],
)(
	"%j returns %j",
	// @ts-ignore
	(
		// @ts-ignore
		{ identifierOrItemOrLevelOrStack, targetLevelOrStack },
		existing,
	) =>
		expect(
			getExisting({
				identifierOrItemOrLevelOrStack,
				targetLevelOrStack,
			}),
		)
		.toEqual(existing),
);