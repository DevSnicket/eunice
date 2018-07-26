const stackRootItems = require("./stackRootItems");

testStackRootItems({
	expected:
		null,
	name:
		"null returns null",
	source:
		{
			items: null,
			levels: null,
		},
});

testStackRootItems({
	expected:
		"item",
	name:
		"item identifier returns item identifier",
	source:
		{
			items: "item",
			levels: [],
		},
});

testStackRootItems({
	expected:
		[ "item1" ],
	name:
		"one item identifier with level of item identifier returns level of item identifier",
	source:
	{
		items: [ "item1" ],
		levels: [ [ "item1" ] ],
	},
});

testStackRootItems({
	expected:
		[ [ "item1", "item2" ] ],
	name:
		"two item identifiers with level of item identifiers returns level of item identifiers",
	source:
	{
		items: [ "item1", "item2" ],
		levels: [ [ "item1", "item2" ] ],
	},
});

testStackRootItems({
	expected:
		[
			[ "item1", "item2" ],
			"item3",
		],
	name:
		"three item identifiers with level of first two item identifiers returns level of first two item identifiers and level of third item identifier",
	source:
	{
		items: [ "item1", "item2", "item3" ],
		levels: [ [ "item1", "item2" ] ],
	},
});

function testStackRootItems({
	expected,
	name,
	source: { items, levels },
}) {
	test(
		name,
		() =>
			expect(
				stackRootItems({
					items,
					levels,
				})
			)
			.toEqual(expected)
	);
}