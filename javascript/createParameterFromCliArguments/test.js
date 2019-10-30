// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

// Unspecified CLI arguments will be undefined.
/* eslint-disable no-undefined */

const createParameterFromCliArguments = require(".");

const pathSeparator = "/";

test(
	"All undefined and forward slash path separator, returns default ignore path pattern, output enabled and base file name; and output and source directory of current.",
	() =>
		expect(
			createParameterFromCliArguments({
				cliArguments: {},
				pathSeparator,
			}),
		)
		.toEqual(
			{
				ignorePathPattern:
					/(^|\/)(\..*|node_modules)$/,
				output:
					{
						enabled:
							{ html: true },
						path:
							{
								baseFileName: "eunice",
								directoryPath: ".",
							},
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
			createParameterFromCliArguments({
				cliArguments:
					{ "babel-parser-plugins": babelParserPlugins },
				pathSeparator,
			})
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
			createParameterFromCliArguments({
				cliArguments:
					{ "include-service-workers": "true" },
				pathSeparator,
			})
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
			createParameterFromCliArguments({
				cliArguments:
					{ "ignore-path-pattern": ignorePathPattern },
				pathSeparator,
			})
			.ignorePathPattern,
		)
		.toEqual(
			new RegExp(ignorePathPattern),
		);
	},
);

test(
	"\"modify-stacks-file\", \"modify-stacks-pattern\" and \"modify-stacks-key\" returns string, regular expression and string.",
	() => {
		const
			modifyStacksFile = "modifyStacksFile",
			modifyStacksKey = "modifyStacksKey",
			modifyStacksPattern = "modifyStacksPattern";

		expect(
			createParameterFromCliArguments({
				cliArguments:
					{
						modifyStacksFile,
						modifyStacksKey,
						modifyStacksPattern,
					},
				pathSeparator,
			})
			.modifyStacksFile,
		)
		.toEqual(
			{
				filePath: modifyStacksFile,
				key: modifyStacksKey,
				pattern: new RegExp(modifyStacksPattern),
			},
		);
	},
);

test(
	"\"packageNames\", \"packagePrefix\" and \"packageScope\" are returned in packages.",
	() =>
		expect(
			createParameterFromCliArguments({
				cliArguments:
					{
						"package-names": [ "package1", "package2" ],
						"package-prefix": "packagePrefix",
						"package-scope": "packageScope",
					},
				pathSeparator,
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
	"\"outputBaseFileName\" and \"outputDirectoryPath\" are returned in output.path.",
	() =>
		expect(
			createParameterFromCliArguments({
				cliArguments:
					{
						"output-base-file-name": "outputBaseFileName",
						"output-directory-path": "outputDirectoryPath",
					},
				pathSeparator,
			})
			.output.path,
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
				cliArguments:
					{
						directories: [ "directory1", "directory2" ],
						"root-item-identifiers": [ "rootItemIdentifier1", "rootItemIdentifier2" ],
					},
				pathSeparator,
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