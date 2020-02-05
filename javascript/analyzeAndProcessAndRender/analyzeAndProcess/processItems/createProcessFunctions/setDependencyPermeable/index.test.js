// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const setDependencyPermeable = require(".");

test.each(
	[
		[
			{ identifierOrItemOrLevelOrStack: null },
			null,
		],
		[
			{
				dependencyPermeableIdentifiers: [],
				identifierOrItemOrLevelOrStack: null,
			},
			null,
		],
		[
			{
				dependencyPermeableIdentifiers: [ ],
				identifierOrItemOrLevelOrStack: "identifier",
			},
			"identifier",
		],
		[
			{
				dependencyPermeableIdentifiers: [ "identifier" ],
				identifierOrItemOrLevelOrStack: "identifier",
			},
			{
				dependencyPermeable: true,
				id: "identifier",
			},
		],
		[
			{
				dependencyPermeableIdentifiers: [ "identifier" ],
				identifierOrItemOrLevelOrStack: { id: "identifier" },
			},
			{
				dependencyPermeable: true,
				id: "identifier",
			},
		],
	],
)(
	"%j returns %j",
	(
		{
			dependencyPermeableIdentifiers,
			identifierOrItemOrLevelOrStack,
		},
		expected,
	) =>
		expect(
			setDependencyPermeable({
				dependencyPermeableIdentifiers,
				identifierOrItemOrLevelOrStack,
			}),
		)
		.toEqual(expected),
);