/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createTestItemWithIdentifier = require("../createTestItemWithIdentifier"),
	getExisting = require(".");

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
	(
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