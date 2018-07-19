const groupItemsByIdentifierSeparator = require("./groupItemsByIdentifierSeparator");

assertGroupItemsEqualsSource({
	name: "null returns null",
	source: null,
});

assertGroupItemsEqualsSource({
	name: "item identifier returns single item identifier",
	source: "item",
});

assertGroupItemsEqualsSource({
	name: "single item identifier returns single item identifier",
	source: [ "item" ],
});

assertGroupItemsEqualsSource({
	name: "single item returns single item",
	source: [ { id: "item" } ],
});

assertGroupItemsEqualsSource({
	name: "single anonymous item returns single anonymous item",
	source: [ {} ],
});

assertGroupItemsEqualsSource({
	name: "two item identifiers returns two item identifiers",
	source: [ "item1", "item2" ],
});

assertGroupItemsEqualsSource({
	name: "second item identifier prefixed with first item identifier returns item identifiers",
	source: [ "item", "itemchildItem" ],
});

assertGroupItems({
	expected:
		[
			{
				id: "item",
				items: "item/childItem",
			},
		],
	name: "second item identifier prefixed with first item identifier and separator returns grouped item",
	source: [ "item", "item/childItem" ],
});

assertGroupItems({
	expected:
		[
			{
				id: "item",
				items: "item/childItem",
			},
		],
	name: "second item identifier prefixed with first item`s identifier and separator returns grouped item",
	source:
		[
			{ id: "item" },
			"item/childItem",
		],
});

assertGroupItems({
	expected:
		[
			{
				id: "item1",
				items: "item1/childItem",
			},
			"item2",
		],
	name: "second item identifier prefixed with first item identifier and separator and third item identifier returns grouped item and third item identifier",
	source: [ "item1", "item1/childItem", "item2" ],
});

assertGroupItems({
	expected:
		[
			{
				id: "item",
				items: [ "item/childItem1", "item/childItem2" ],
			},
		],
	name: "second and third item identifiers prefixed with first item identifier and separator returns grouped item",
	source: [ "item", "item/childItem1", "item/childItem2" ],
});

assertGroupItems({
	expected:
		[
			{
				id: "item",
				items: { id: "item/childItem", items: "item/childItem/grandchildItem" },
			},
		],
	name: "second item identifier prefixed with first item identifier and separator, and third item identifier prefixed with second item identifier and separator returns grouped item with grouped item",
	source: [ "item", "item/childItem", "item/childItem/grandchildItem" ],
});

assertGroupItems({
	expected:
		[
			{
				id:
					"item",
				items:
					{
						id: "item/childItem",
						items: { id: "item/childItem/grandchildItem", items: "item/childItem/grandchildItem/greatgrandchildItem" },
					},
			},
		],
	name: "second item identifier prefixed with first item identifier and separator, third item identifier prefixed with second item identifier and separator, and four item identifier prefixed with third item identifier and separator returns grouped item with grouped item with grouped item",
	source: [ "item", "item/childItem", "item/childItem/grandchildItem", "item/childItem/grandchildItem/greatgrandchildItem" ],
});

assertGroupItems({
	expected:
		[
			{
				id:
					"item",
				items:
					[
						{ id: "item/childItem1", items: "item/childItem1/grandchildItem" },
						"item/childItem2",
					],
			},
		],
	name: "second item identifier prefixed with first item identifier and separator, third item identifier prefixed with second item identifier and separator, and four item identifier prefixed with first item identifier and separator returns grouped item with grouped item and non-grouped item",
	source: [ "item", "item/childItem1", "item/childItem1/grandchildItem", "item/childItem2" ],
});

assertGroupItems({
	expected:
		[
			{
				id:
					"item",
				items:
					{
						id:
							"item/childItem",
						items:
							[
								"item/childItem/grandchildItem1",
								{ id: "item/childItem/grandchildItem2", items: "item/childItem/grandchildItem2/greatgrandchildItem" },
							],
					},
			},
		],
	name: "second item identifier prefixed with first item identifier and separator, third and fourth item identifiers prefixed with second item identifier and separator, and fifth item identifier prefixed with four item identifier and separator returns grouped item with grouped item with grouped item and non-grouped item",
	source: [ "item", "item/childItem", "item/childItem/grandchildItem1", "item/childItem/grandchildItem2", "item/childItem/grandchildItem2/greatgrandchildItem" ],
});

assertGroupItems({
	expected:
		[
			{
				id: "item",
				items: [ "item/childItem1", "item/childItem2", "item/childItem3" ],
			},
		],
	name: "second to fourth item identifiers prefixed with first item identifier and separator returns grouped item",
	source: [ "item", "item/childItem1", "item/childItem2", "item/childItem3" ],
});

assertGroupItems({
	expected:
		[
			{
				id:
					"item",
				items:
					{
						id: "item/childItem",
						items: [ "/item/childItem/grandChildItem1", "/item/childItem/grandChildItem2" ],
					},
			},
		],
	name: "second item with two child item identifiers prefixed with second item`s identifier and separator returns grouped item",
	source:
		[
			"item",
			{
				id: "item/childItem",
				items: [ "/item/childItem/grandChildItem1", "/item/childItem/grandChildItem2" ],
			},
		],
});

assertGroupItems({
	expected:
		[
			{
				id: "item",
				items: [ "childItem1", "item/childItem2" ],
			},
		],
	name: "first item with child item and second item identifier prefixed with first item`s identifier and separator returns grouped item",
	source: [ { id: "item", items: "childItem1" }, "item/childItem2" ],
});

assertGroupItems({
	expected:
		[
			{
				id: "item",
				items: [ "childItem1", "childItem2", "item/childItem2" ],
			},
		],
	name: "first item with two child items and second item identifier prefixed with first item`s identifier and separator returns grouped item",
	source: [ { id: "item", items: [ "childItem1", "childItem2" ] }, "item/childItem2" ],
});

function assertGroupItemsEqualsSource({
	name,
	source,
}) {
	assertGroupItems({
		expected: source,
		name,
		source,
	});
}

function assertGroupItems({
	expected,
	name,
	source,
}) {
	if (typeof test === "undefined")
		// eslint-disable-next-line no-console
		console.log(`${name}\n${groupItems(source)}`);
	else
		test(
			name,
			() =>
				expect(groupItems(source))
				.toEqual(expected)
		);
}

function groupItems(
	items
) {
	return (
		groupItemsByIdentifierSeparator({
			identifierSeparator: "/",
			items,
		})
	);
}