const createOrAddToStacksToItemsWithIdentifier = require(".");

test(
	"stack grandchild items",
	() =>
		expect(
			createOrAddToStacksToItemsWithIdentifier({
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
				toIdentifier:
					"parent",
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