// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

// Unspecified CLI arguments will be undefined.
/* eslint-disable no-undefined */

const createParameterFromCliArguments = require(".");

test(
	"All undefined returns default output base file name, and output and source directory of current.",
	() =>
		expect(
			createParameterFromCliArguments({}),
		)
		.toEqual(
			{
				outputPath:
					{
						baseFileName: "eunice",
						directoryPath: ".",
					},
				sources:
					[ { directory: "." } ],
			},
		),
);

test(
	"\"babel-parser-plugins\" of string returns array.",
	() => {
		const babelParserPlugins = "plugin";

		expect(
			createParameterFromCliArguments(
				{ "babel-parser-plugins": babelParserPlugins },
			)
			.babelParserPlugins,
		)
		.toEqual(
			[ babelParserPlugins ],
		);
	},
);

test(
	"\"include-service-workers\" of string \"true\" returns boolean true.",
	() =>
		expect(
			createParameterFromCliArguments(
				{ "include-service-workers": "true" },
			)
			.includeServiceWorkers,
		)
		.toEqual(
			true,
		),
);

test(
	"\"ignore-path-pattern\" of string returns regular expression.",
	() => {
		const ignorePathPattern = "ignore";

		expect(
			createParameterFromCliArguments(
				{ "ignore-path-pattern": ignorePathPattern },
			)
			.ignorePathPattern,
		)
		.toEqual(
			new RegExp(ignorePathPattern),
		);
	},
);

test(
	"\"packageNames\", \"packagePrefix\" and \"packageScope\" are returned in packages.",
	() =>
		expect(
			createParameterFromCliArguments({
				"package-names": [ "package1", "package2" ],
				"package-prefix": "packagePrefix",
				"package-scope": "packageScope",
			})
			.packages,
		)
		.toEqual(
			{
				names: [ "package1", "package2" ],
				prefix: "packagePrefix",
				scope: "packageScope",
			},
		),
);

test(
	"\"outputBaseFileName\" and \"outputDirectoryPath\" are returned in outputPath.",
	() =>
		expect(
			createParameterFromCliArguments({
				"output-base-file-name": "outputBaseFileName",
				"output-directory-path": "outputDirectoryPath",
			})
			.outputPath,
		)
		.toEqual(
			{
				baseFileName: "outputBaseFileName",
				directoryPath: "outputDirectoryPath",
			},
		),
);

test(
	"\"directories\" and \"rootItemIdentifiers\" are zipped together and returned in sources.",
	() =>
		expect(
			createParameterFromCliArguments({
				directories: [ "directory1", "directory2" ],
				"root-item-identifiers": [ "rootItemIdentifier1", "rootItemIdentifier2" ],
			})
			.sources,
		)
		.toEqual(
			[
				{
					directory: "directory1",
					rootItemIdentifier: "rootItemIdentifier1",
				},
				{
					directory: "directory2",
					rootItemIdentifier: "rootItemIdentifier2",
				},
			],
		),
);