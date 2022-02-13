/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import getIdentifiersInTargetLevelOrStack from ".";

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
	// @ts-ignore
	(targetLevelOrStack, expected) =>
		expect(getIdentifiersInTargetLevelOrStack(targetLevelOrStack))
		.toEqual(expected),
);