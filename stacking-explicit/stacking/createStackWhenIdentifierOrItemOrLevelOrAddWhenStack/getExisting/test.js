/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createTestItemWithIdentifier = require("../createTestItemWithIdentifier"),
	getExisting = require(".");

const
	inTarget = createTestItemWithIdentifier("inTarget"),
	leftInTarget = createTestItemWithIdentifier("leftInTarget"),
	leftNotInTarget = createTestItemWithIdentifier("leftNotInTarget"),
	lowerInTarget = createTestItemWithIdentifier("lowerInTarget"),
	lowerNotInTarget = createTestItemWithIdentifier("lowerNotInTarget"),
	notInTarget = createTestItemWithIdentifier("notInTarget"),
	rightInTarget = createTestItemWithIdentifier("rightInTarget"),
	rightNotInTarget = createTestItemWithIdentifier("rightNotInTarget"),
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
				targetLevelOrStack: [ "newInTarget" ],
			},
			null,
		],
		[
			{
				identifierOrItemOrLevelOrStack: "inTarget",
				targetLevelOrStack: [ "inTarget" ],
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
				identifierOrItemOrLevelOrStack: [ [ upperInTarget ], [ lowerInTarget ] ],
				targetLevelOrStack: [ "upperInTarget", "lowerInTarget" ],
			},
			null,
		],
		[
			{
				identifierOrItemOrLevelOrStack: "inTarget",
				targetLevelOrStack: [ "newInTarget", "inTarget" ],
			},
			null,
		],
		[
			{
				identifierOrItemOrLevelOrStack: inTarget,
				targetLevelOrStack: [ [ "inTarget" ] ],
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
				identifierOrItemOrLevelOrStack: notInTarget,
				targetLevelOrStack: [ ],
			},
			notInTarget,
		],
		[
			{
				identifierOrItemOrLevelOrStack: notInTarget,
				targetLevelOrStack: [ "newInTarget" ],
			},
			notInTarget,
		],
		[
			{
				identifierOrItemOrLevelOrStack: notInTarget,
				targetLevelOrStack: [ "leftNewInTarget", "rightNewInTarget" ],
			},
			notInTarget,
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
				identifierOrItemOrLevelOrStack: [ leftNotInTarget, rightNotInTarget ],
				targetLevelOrStack: [ ],
			},
			[ leftNotInTarget, rightNotInTarget ],
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ leftNotInTarget, inTarget ],
				targetLevelOrStack: [ "inTarget" ],
			},
			leftNotInTarget,
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ inTarget, rightNotInTarget ],
				targetLevelOrStack: [ "inTarget" ],
			},
			rightNotInTarget,
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ [ upperNotInTarget ], [ lowerNotInTarget ] ],
				targetLevelOrStack: [ ],
			},
			[ [ upperNotInTarget ], [ lowerNotInTarget ] ],
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
				identifierOrItemOrLevelOrStack: [ upperNotInTarget, [ lowerNotInTarget ] ],
				targetLevelOrStack: [ ],
			},
			[ [ upperNotInTarget ], [ lowerNotInTarget ] ],
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ [ upperInTarget ], [ lowerNotInTarget ] ],
				targetLevelOrStack: [ "upperInTarget" ],
			},
			lowerNotInTarget,
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ [ upperNotInTarget ], [ lowerInTarget ] ],
				targetLevelOrStack: [ "lowerInTarget" ],
			},
			upperNotInTarget,
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