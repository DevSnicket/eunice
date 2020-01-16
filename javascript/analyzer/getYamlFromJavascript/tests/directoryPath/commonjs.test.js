// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const getYamlFromJavascript = require("../..");

test.each(
	[ ".", "./" ],
)(
	"Call of directory default \"%s\" require from subdirectory creates depends upon of subdirectory",
	requirePath =>
		expect(
			getYamlFromJavascript({
				directoryPath:
					{
						absolute: null,
						relative: "subdirectory",
					},
				javascript:
					`require("${requirePath}")();`,
			}),
		)
		.toBe(
			"dependsUpon: subdirectory",
		),
);