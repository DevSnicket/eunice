const setTypeOfRootItems = require(".");

assertSetTypeOfRootItems({
	expected: null,
	name: "null returns null",
	source: null,
});

assertSetTypeOfRootItems({
	expected: { id: "item", type: "testType" },
	name: "item identifier returns item identifier",
	source: "item",
});

assertSetTypeOfRootItems({
	expected: [ { id: "item", type: "testType" } ],
	name: "single item identifier returns single item identifier",
	source: [ "item" ],
});

assertSetTypeOfRootItems({
	expected:
		[
			{ id: "item1", type: "testType" },
			{ id: "item2", type: "testType" },
		],
	name: "two item identifier returns two item identifier",
	source: [ "item1", "item2" ],
});

assertSetTypeOfRootItems({
	expected: { id: "item", type: "testType" },
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
					type: "testType",
				}),
			)
			.toEqual(expected),
	);
}