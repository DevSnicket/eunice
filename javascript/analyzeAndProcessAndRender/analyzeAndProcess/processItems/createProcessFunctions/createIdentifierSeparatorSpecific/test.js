// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const createIdentifierSeparatorSpecific = require(".");

describe(
	"Separator of \"/\"",
	() =>
		test.each(
			[
				[ "directory-index", "directory-index" ],
				[ "directory/index", "directory" ],
				[ "index", "" ],
				[ "subindex", "subindex" ],
			],
		)(
			"\"%s\" returns \"%s\".",
			(items, expected) =>
				expect(
					createIdentifierSeparatorSpecific("/")
					.removeIndexFileSuffix(items),
				)
				.toEqual(
					expected,
				),
		),
);