// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const getIdentifiersInTargetLevelOrStack = require(".");

test.each(
	[
		[ [], [] ],
		[ [ null ], [ null ] ],
		[
			[ "left", "right" ],
			[ "left", "right" ],
		],
		[
			[ [ "upper" ], [ "lower" ] ],
			[ "upper", "lower" ],
		],
		[
			[
				[ "upperLeft", "upperRight" ],
				[ "lowerLeft", "lowerRight" ],
			],
			[ "upperLeft", "upperRight", "lowerLeft", "lowerRight" ],
		],
		[
			[ { id: "item" } ],
			[ "item" ],
		],
		[
			[ { items: "child" } ],
			[ null, "child" ],
		],
		[
			[ {
				id: "parent",
				items: "child",
			} ],
			[ "parent", "child" ],
		],
		[
			[ {
				id: "parent",
				items: [ "leftChild", "rightChild" ],
			} ],
			[ "parent", "leftChild", "rightChild" ],
		],
		[
			[ {
				id: "parent",
				items: [ [ "upperChild" ], [ "lowerChild" ] ],
			} ],
			[ "parent", "upperChild", "lowerChild" ],
		],
		[
			[ {
				id:
					"parent",
				items:
					[
						[ "upperLeft", "upperRight" ],
						[ "lowerLeft", "lowerRight" ],
					],
			} ],
			[ "parent", "upperLeft", "upperRight", "lowerLeft", "lowerRight" ],
		],
		[
			[ {
				id:
					"grandparent",
				items:
					{
						id: "parent",
						items: "child",
					},
			} ],
			[ "grandparent", "parent", "child" ],
		],
	],
)(
	"%j returns %j",
	(targetLevelOrStack, expected) =>
		expect(getIdentifiersInTargetLevelOrStack(targetLevelOrStack))
		.toEqual(expected),
);