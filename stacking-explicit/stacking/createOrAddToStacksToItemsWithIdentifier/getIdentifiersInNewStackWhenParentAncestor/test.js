const getIdentifiersInNewStackWhenParentAncestor = require(".");

const identifiersInNewStack = { toJSON: () => "identifiersInNewStack" };

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
			identifiersInNewStack,
		],
		[
			[ { id: "ancestor" }, { id: "addToParent" } ],
			identifiersInNewStack,
		],
	],
)(
	"%j ancestors returns %j",
	(ancestors, expected) =>
		expect(
			getIdentifiersInNewStackWhenParentAncestor({
				ancestors,
				identifiersInNewStack,
				parentIdentifier: "addToParent",
			}),
		)
		.toBe(
			expected,
		),
);