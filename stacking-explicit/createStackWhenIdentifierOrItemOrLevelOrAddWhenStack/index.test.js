// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

import createStackWhenIdentifierOrItemOrLevelOrAddWhenStack from ".";

test(
	"Null and target of existing returns null.",
	() =>
		expect(
			createStackWhenIdentifierOrItemOrLevelOrAddWhenStack({
				identifierOrItemOrLevelOrStack: null,
				targetLevelOrStack: [ "existing" ],
			}),
		)
		.toBeNull(),
);

test(
	"Identifier in target returns identifier.",
	() =>
		expect(
			createStackWhenIdentifierOrItemOrLevelOrAddWhenStack({
				identifierOrItemOrLevelOrStack: "item",
				targetLevelOrStack: [ "item" ],
			}),
		)
		.toEqual(
			"item",
		),
);

test(
	"Identifier not in target and existing in target returns identifier.",
	() =>
		expect(
			createStackWhenIdentifierOrItemOrLevelOrAddWhenStack({
				identifierOrItemOrLevelOrStack: "item",
				targetLevelOrStack: [ "existing" ],
			}),
		)
		.toEqual(
			"item",
		),
);

test(
	"Identifier not in target throws error.",
	() =>
		expect(
			() =>
				createStackWhenIdentifierOrItemOrLevelOrAddWhenStack({
					identifierOrItemOrLevelOrStack: "item",
					targetLevelOrStack: [],
				}),
		)
		.toThrowError(
			"Neither the following items were specified \"item\", nor was a single item level of \"existing\", in new the stack [].",
		),
);