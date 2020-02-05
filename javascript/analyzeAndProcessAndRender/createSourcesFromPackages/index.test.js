// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createSourcesFromPackages = require("."),
	path = require("path");

test.each(
	[
		[
			{ name: "package", scope: "scope" },
			path.join("node_modules", "@scope", "package"),
		],
		[
			{ name: "package", prefix: "prefix-" },
			path.join("node_modules", "prefix-package"),
		],
	],
)(
	"%j returns %s.",
	(
		{ name, prefix, scope },
		directory,
	) =>
		expect(
			createSourcesFromPackages({
				names: [ name ],
				prefix,
				scope,
			}),
		)
		.toEqual(
			[ {
				directory,
				rootItemIdentifier: "package",
			} ],
		),
);