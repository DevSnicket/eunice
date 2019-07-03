/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const getIdentifiersInNewStackWhenParentAncestor = require(".");

const identifiersInNewStack = { toJSON: () => "identifiersInNewStack" };

test.each(
	[
		[ [], null ],
		[
			[ { } ],
			null,
		],
		[
			[ { id: "parent" } ],
			null,
		],
		[
			[ { id: "addToParent" }, { id: "ancestor" } ],
			null,
		],
		[
			[ { id: "addToParent" } ],
			identifiersInNewStack,
		],
		[
			[ { id: "ancestor" }, { id: "addToParent" } ],
			identifiersInNewStack,
		],
	],
)(
	"%j ancestors returns %j",
	(ancestors, expected) =>
		expect(
			getIdentifiersInNewStackWhenParentAncestor({
				ancestors,
				identifiersInNewStack,
				parentIdentifierPattern: "addToParent",
			}),
		)
		.toBe(
			expected,
		),
);