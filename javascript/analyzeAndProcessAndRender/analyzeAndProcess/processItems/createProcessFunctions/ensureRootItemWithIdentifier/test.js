/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const ensureRootItemWithIdentifier = require(".");

test(
	"Identifier and items of null returns null.",
	() =>
		expect(
			ensureRootItemWithIdentifier({
				identifier: null,
				items: null,
			}),
		)
		.toBeNull(),
);

test(
	"Identifier of null returns items.",
	() => {
		const items = {};

		expect(
			ensureRootItemWithIdentifier({
				identifier: null,
				items,
			}),
		)
		.toBe(
			items,
		);
	},
);

test(
	"Item without identifier returns new item with identifier and items of item items.",
	() =>
		expect(
			ensureRootItemWithIdentifier({
				identifier: "identifier",
				items: { items: "child" },
			}),
		)
		.toEqual({
			id: "identifier",
			items: "child",
		}),
);

test(
	"Item with different identifier returns new item with identifier and items of item.",
	() =>
		expect(
			ensureRootItemWithIdentifier({
				identifier: "identifier",
				items: { id: "item", items: "child" },
			}),
		)
		.toEqual({
			id: "identifier",
			items: { id: "item", items: "child" },
		}),
);