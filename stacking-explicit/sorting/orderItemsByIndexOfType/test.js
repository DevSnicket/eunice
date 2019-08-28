// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

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