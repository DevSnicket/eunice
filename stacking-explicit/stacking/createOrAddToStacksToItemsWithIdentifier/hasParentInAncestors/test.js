/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const hasParentInAncestors = require(".");

test.each(
	[
		[ [], false ],
		[ [ { } ], false ],
		[
			[ { id: "parent" } ],
			false,
		],
		[
			[ { id: "addToParent" }, { id: "ancestor" } ],
			false,
		],
		[
			[ { id: "addToParent" } ],
			true,
		],
		[
			[ { id: "ancestor" }, { id: "addToParent" } ],
			true,
		],
	],
)(
	"%j ancestors returns %j",
	(ancestors, expected) =>
		expect(
			hasParentInAncestors({
				ancestors,
				parentIdentifierPattern: "addToParent",
			}),
		)
		.toBe(
			expected,
		),
);