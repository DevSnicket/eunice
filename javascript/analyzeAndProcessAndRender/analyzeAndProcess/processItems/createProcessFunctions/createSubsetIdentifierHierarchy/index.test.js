// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const createSubsetIdentifierHierarchy = require(".");

test(
	"identifierOrItemOrLevelOrStack of null returns rootItemIdentifier in array.",
	() =>
		expect(
			createSubsetIdentifierHierarchy({
				identifierOrItemOrLevelOrStack: null,
				rootItemIdentifier: "rootItemIdentifier",
			}),
		)
		.toEqual(
			[ "rootItemIdentifier" ],
		),
);

test(
	"Item with no identifier returns array of single undefined.",
	() =>
		expect(
			createSubsetIdentifierHierarchy({
				identifierOrItemOrLevelOrStack: {},
				rootItemIdentifier: null,
			}),
		)
		.toEqual(
			// the identifierOrItemOrLevelOrStack id property wont be defined
			// eslint-disable-next-line no-undefined
			[ undefined ],
		),
);

test(
	"Item with identifier returns null.",
	() =>
		expect(
			createSubsetIdentifierHierarchy({
				identifierOrItemOrLevelOrStack: { id: "identifier" },
				rootItemIdentifier: null,
			}),
		)
		.toBeNull(),
);