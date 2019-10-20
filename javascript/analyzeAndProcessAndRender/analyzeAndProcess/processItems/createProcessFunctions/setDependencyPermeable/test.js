// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const setDependencyPermeable = require(".");

test.each(
	[
		[
			{ items: null },
			null,
		],
		[
			{
				dependencyPermeableIdentifiers: [],
				items: null,
			},
			null,
		],
		[
			{
				dependencyPermeableIdentifiers: [ ],
				items: "identifier",
			},
			"identifier",
		],
		[
			{
				dependencyPermeableIdentifiers: [ "identifier" ],
				items: "identifier",
			},
			{
				dependencyPermeable: true,
				id: "identifier",
			},
		],
		[
			{
				dependencyPermeableIdentifiers: [ "identifier" ],
				items: { id: "identifier" },
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
			items,
		},
		expected,
	) =>
		expect(
			setDependencyPermeable({
				dependencyPermeableIdentifiers,
				items,
			}),
		)
		.toEqual(expected),
);