/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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