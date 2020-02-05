// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const getStackOrSingleLevelOrSingleItem = require(".");

test(
	"Null returns null.",
	() =>
		expect(getStackOrSingleLevelOrSingleItem(null))
		.toBeNull(),
);

test(
	"Level of one items returns item.",
	() => {
		const item = {};

		expect(getStackOrSingleLevelOrSingleItem([ item ]))
		.toBe(item);
	},
);

test(
	"Level of two items returns level.",
	() => {
		const level = [ {}, {} ];

		expect(getStackOrSingleLevelOrSingleItem(level))
		.toBe(level);
	},
);

test(
	"Stack of two levels, of two items each, returns stack.",
	() => {
		const stack =
			[
				[ {}, {} ],
				[ {}, {} ],
			];

		expect(getStackOrSingleLevelOrSingleItem(stack))
		.toBe(stack);
	},
);

test(
	"Stack of one level, of one item, returns item.",
	() => {
		const item = {};

		expect(getStackOrSingleLevelOrSingleItem([ [ item ] ]))
		.toBe(item);
	},
);