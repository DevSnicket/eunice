const getIdentifiersToStack = require(".");

const identifiersToStack = { toJSON: () => "identifiersToStack" };

test.each(
	[
		[ [], null ],
		[
			[ { } ],
			null,
		],
		[
			[ { id: "parent" } ],
			null,
		],
		[
			[ { id: "addToParent" }, { id: "ancestor" } ],
			null,
		],
		[
			[ { id: "addToParent" } ],
			identifiersToStack,
		],
		[
			[ { id: "ancestor" }, { id: "addToParent" } ],
			identifiersToStack,
		],
	],
)(
	"%j ancestors returns %j",
	(ancestors, expected) =>
		expect(
			getIdentifiersToStack({
				ancestors,
				identifiersToStack,
				parentIdentifier: "addToParent",
			}),
		)
		.toBe(
			expected,
		),
);