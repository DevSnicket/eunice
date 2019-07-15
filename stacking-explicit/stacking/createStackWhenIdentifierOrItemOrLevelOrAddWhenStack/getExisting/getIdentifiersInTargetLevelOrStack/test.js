/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const getIdentifiersInTargetLevelOrStack = require(".");

test.each(
	[
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
			[ "child" ],
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