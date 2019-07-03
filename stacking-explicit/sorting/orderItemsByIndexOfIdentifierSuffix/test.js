/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const orderItemsByIdentifierSuffix = require(".");

const
	expected =
		[
			{ id: "item3/suffix3" },
			{ id: "item2/suffix2" },
			{ id: "item1/suffix1" },
			{ notId: "item4" },
		],
	identifierSuffixesInOrder =
		[ "/suffix3", "/suffix2" ],
	items =
		[
			{ id: "item1/suffix1" },
			{ id: "item2/suffix2" },
			{ id: "item3/suffix3" },
			{ notId: "item4" },
		];

test(
	`${JSON.stringify(items)} items and identifier suffixes in order ${JSON.stringify(identifierSuffixesInOrder)} returns ${JSON.stringify(expected)}`,
	() =>
		expect(
			orderItemsByIdentifierSuffix({
				identifierSuffixesInOrder,
				items,
			}),
		)
		.toEqual(
			expected,
		),
);