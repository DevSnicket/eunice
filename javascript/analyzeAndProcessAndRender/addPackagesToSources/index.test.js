// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import addPackagesToSources from ".";
import path from "path";

test.each(
	[
		[
			{ sources: null },
			null,
		],
		[
			{ sources: "sources" },
			"sources",
		],
		[
			{
				packages: { names: null },
				sources: "sources",
			},
			"sources",
		],
		[
			{
				packages:
					{
						names: [ "package" ],
						scope: "scope",
					},
				sources:
					[ "sources" ],
			},
			[
				{
					directory: path.join("node_modules", "@scope", "package"),
					rootItemIdentifier: "package",
				},
				"sources",
			],
		],
		[
			{
				packages:
					{
						names: [ "package" ],
						prefix: "prefix-",
					},
				sources:
					[ "sources" ],
			},
			[
				{
					directory: path.join("node_modules", "prefix-package"),
					rootItemIdentifier: "package",
				},
				"sources",
			],
		],
		[
			{
				packages:
					{
						names: [ "package" ],
						prefix: "prefix-",
						scope: "scope",
					},
				sources:
					[ "sources" ],
			},
			[
				{
					directory: path.join("node_modules", "@scope", "prefix-package"),
					rootItemIdentifier: "package",
				},
				"sources",
			],
		],
	],
)(
	"%j returns %j.",
	(
		{ packages, sources },
		expected,
	) =>
		expect(
			addPackagesToSources({
				packages,
				sources,
			}),
		)
		.toEqual(expected),
);