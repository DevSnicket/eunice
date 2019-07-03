/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const orderItemsByType = require(".");

const
	expected =
		[
			{ id: "item1" },
			{ id: "item2", type: "type1" },
			{ id: "item3", type: "type2" },
		],
	items =
		[
			{ id: "item3", type: "type2" },
			{ id: "item2", type: "type1" },
			{ id: "item1" },
		],
	typesInOrder =
		// type array index of will only work when exact match
		// eslint-disable-next-line no-undefined
		[ undefined, "type1", "type2" ];


test(
	`${JSON.stringify(items)} items and types in order ${JSON.stringify(typesInOrder)} returns ${JSON.stringify(expected)}`,
	() =>
		expect(
			orderItemsByType({
				items,
				typesInOrder,
			}),
		)
		.toEqual(
			expected,
		),
);