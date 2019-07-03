/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const orderItemsByIdentifier = require(".");

test.each(
	[
		[
			null,
			null,
		],
		[
			"item1",
			"item1",
		],
		[
			{ id: "item1" },
			{ id: "item1" },
		],
		[
			[
				{ id: "item1" },
				{ id: "item3" },
				{ id: "item2" },
			],
			[
				{ id: "item1" },
				{ id: "item2" },
				{ id: "item3" },
			],
		],
		[
			[
				{ id: "item2" },
				{ anotherIdentifier: "item3" },
				{ id: "item1" },
			],
			[
				{ anotherIdentifier: "item3" },
				{ id: "item1" },
				{ id: "item2" },
			],
		],
	],
)(
	"%j items returns %j",
	(items, expected) =>
		expect(
			orderItemsByIdentifier(items),
		)
		.toEqual(
			expected,
		),
);