const createOrAddToStacksUniformly = require(".");

test(
	"stack child items",
	() =>
		expect(
			createOrAddToStacksUniformly({
				identifiersInNewStack:
					[
						[ "existing" ],
						[ "child 1" ],
						[ "child 2" ],
					],
				items:
					{
						id: "parent",
						items: [ "child 1", "child 2" ],
					},
			}),
		)
		.toEqual(
			[
				{
					id:
						"parent",
					items:
						[
							[ "child 1" ],
							[ "child 2" ],
						],
				},
			],
		),
);