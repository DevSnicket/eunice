const setTypeOfRootItems = require(".");

assertSetTypeOfRootItems({
	expected: null,
	name: "null returns null",
	source: null,
});

assertSetTypeOfRootItems({
	expected: { id: "item", type: "testtype" },
	name: "item identifier returns item identifier",
	source: "item",
});

assertSetTypeOfRootItems({
	expected: [ { id: "item", type: "testtype" } ],
	name: "single item identifier returns single item identifier",
	source: [ "item" ],
});

assertSetTypeOfRootItems({
	expected:
		[
			{ id: "item1", type: "testtype" },
			{ id: "item2", type: "testtype" },
		],
	name: "two item identifier returns two item identifier",
	source: [ "item1", "item2" ],
});

assertSetTypeOfRootItems({
	expected: { id: "item", type: "testtype" },
	name: "single item returns single item",
	source: { id: "item" },
});

function assertSetTypeOfRootItems({
	expected,
	name,
	source,
}) {
	test(
		name,
		() =>
			expect(
				setTypeOfRootItems({
					items: source,
					type: "testtype",
				}),
			)
			.toEqual(expected),
	);
}