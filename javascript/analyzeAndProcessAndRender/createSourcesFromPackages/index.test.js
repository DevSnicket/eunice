// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createSourcesFromPackages from ".";
import path from "path";

test.each(
	[
		[
			{ names: null },
			null,
		],
		[
			{
				names: [ "package" ],
				scope: "scope",
			},
			[ {
				directory: path.join("node_modules", "@scope", "package"),
				rootItemIdentifier: "package",
			} ],
		],
		[
			{
				names: [ "package" ],
				prefix: "prefix-",
			},
			[ {
				directory: path.join("node_modules", "prefix-package"),
				rootItemIdentifier: "package",
			} ],
		],
	],
)(
	"%j returns %s.",
	(
		{ names, prefix, scope },
		sources,
	) =>
		expect(
			createSourcesFromPackages({
				names,
				prefix,
				scope,
			}),
		)
		.toEqual(sources),
);