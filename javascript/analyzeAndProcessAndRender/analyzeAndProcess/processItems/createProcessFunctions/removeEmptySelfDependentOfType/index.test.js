// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const removeEmptySelfDependentOfType = require(".");

test.each(
	[
		[
			{
				dependsUpon: "item",
				id: "item",
			},
			{
				dependsUpon: "item",
				id: "item",
			},
		],
		[
			{
				dependsUpon: "anotherItem",
				id: "item",
				type: "type",
			},
			{
				dependsUpon: "anotherItem",
				id: "item",
				type: "type",
			},
		],
		[
			{
				dependsUpon: "item",
				id: "item",
				otherProperty: "otherValue",
				type: "type",
			},
			{
				dependsUpon: "item",
				id: "item",
				otherProperty: "otherValue",
				type: "type",
			},
		],
		[
			{
				dependsUpon: "item",
				id: "item",
				type: "type",
			},
			null,
		],
		[
			{
				dependsUpon: [ "item" ],
				id: "item",
				type: "type",
			},
			null,
		],
	],
)(
	"%j items returns %j",
	(identifierOrItemOrLevelOrStack, expected) =>
		expect(
			removeEmptySelfDependentOfType({
				identifierOrItemOrLevelOrStack,
				type: "type",
			}),
		)
		.toEqual(expected),
);