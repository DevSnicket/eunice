// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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