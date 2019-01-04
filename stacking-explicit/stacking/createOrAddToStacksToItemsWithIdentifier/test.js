const createOrAddToStacksToItemsWithIdentifier = require(".");

test(
	"stack grandchild items",
	() =>
		expect(
			createOrAddToStacksToItemsWithIdentifier({
				identifierPattern:
					"^parent",
				identifiersInNewStack:
					[
						[ "child 1" ],
						[ "child 2" ],
					],
				items:
					{
						id:
							"grandparent",
						items:
							{
								id: "parent",
								items: [ "child 1", "child 2" ],
							},
					},
			}),
		)
		.toEqual(
			{
				id:
					"grandparent",
				items:
					{
						id:
							"parent",
						items:
							[
								[ "child 1" ],
								[ "child 2" ],
							],
					},
			},
		),
);