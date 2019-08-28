// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

// Unspecified CLI arguments will be undefined.
/* eslint-disable no-undefined */

const createParameterFromCliArguments = require(".");

test(
	"All undefined returns default output base file name, and output and source directory of current.",
	() =>
		expect(
			createParameterFromCliArguments({
				babelParserPlugins: undefined,
				ignorePathPattern: undefined,
				includeServiceWorkers: undefined,
				includeSourceMap: undefined,
				isFileContentReversed: undefined,
				outputBaseFileName: undefined,
				outputDirectoryPath: undefined,
				packageNames: undefined,
				packagePrefix: undefined,
				packageScope: undefined,
				rootItemIdentifiers: undefined,
			}),
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
	"\"babelParserPlugins\" of string returns array.",
	() => {
		const babelParserPlugins = "plugin";

		expect(
			createParameterFromCliArguments({
				babelParserPlugins,
				ignorePathPattern: undefined,
				includeServiceWorkers: undefined,
				includeSourceMap: undefined,
				isFileContentReversed: undefined,
				outputBaseFileName: undefined,
				outputDirectoryPath: undefined,
				packageNames: undefined,
				packagePrefix: undefined,
				packageScope: undefined,
				rootItemIdentifiers: undefined,
			})
			.babelParserPlugins,
		)
		.toEqual(
			[ babelParserPlugins ],
		);
	},
);

test(
	"\"includeServiceWorkers\" of string \"true\" returns boolean true.",
	() =>
		expect(
			createParameterFromCliArguments({
				babelParserPlugins: undefined,
				ignorePathPattern: undefined,
				includeServiceWorkers: "true",
				includeSourceMap: undefined,
				isFileContentReversed: undefined,
				outputBaseFileName: undefined,
				outputDirectoryPath: undefined,
				packageNames: undefined,
				packagePrefix: undefined,
				packageScope: undefined,
				rootItemIdentifiers: undefined,
			})
			.includeServiceWorkers,
		)
		.toEqual(
			true,
		),
);

test(
	"\"ignorePathPattern\" of string returns regular expression.",
	() => {
		const ignorePathPattern = "ignore";

		expect(
			createParameterFromCliArguments({
				babelParserPlugins: undefined,
				ignorePathPattern,
				includeServiceWorkers: undefined,
				includeSourceMap: undefined,
				isFileContentReversed: undefined,
				outputBaseFileName: undefined,
				outputDirectoryPath: undefined,
				packageNames: undefined,
				packagePrefix: undefined,
				packageScope: undefined,
				rootItemIdentifiers: undefined,
			})
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
				babelParserPlugins: undefined,
				ignorePathPattern: undefined,
				includeServiceWorkers: undefined,
				includeSourceMap: undefined,
				isFileContentReversed: undefined,
				outputBaseFileName: undefined,
				outputDirectoryPath: undefined,
				packageNames: [ "package1", "package2" ],
				packagePrefix: "packagePrefix",
				packageScope: "packageScope",
				rootItemIdentifiers: undefined,
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
				babelParserPlugins: undefined,
				ignorePathPattern: undefined,
				includeServiceWorkers: undefined,
				includeSourceMap: undefined,
				isFileContentReversed: undefined,
				outputBaseFileName: "outputBaseFileName",
				outputDirectoryPath: "outputDirectoryPath",
				packageNames: undefined,
				packagePrefix: undefined,
				packageScope: undefined,
				rootItemIdentifiers: undefined,
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
				babelParserPlugins: undefined,
				directories: [ "directory1", "directory2" ],
				ignorePathPattern: undefined,
				includeServiceWorkers: undefined,
				includeSourceMap: undefined,
				outputBaseFileName: undefined,
				outputDirectoryPath: undefined,
				packageNames: undefined,
				packagePrefix: undefined,
				packageScope: undefined,
				rootItemIdentifiers: [ "rootItemIdentifier1", "rootItemIdentifier2" ],
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