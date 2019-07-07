/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

// Unspecified CLI arguments will be undefined.
/* eslint-disable no-undefined */

const createParameterFromCliArguments = require(".");

test(
	"All undefined returns default output base file name, and output and source directory of current.",
	() =>
		expect(
			createParameterFromCliArguments({
				ignoreDirectoryNames: undefined,
				isHtmlSingleFile: undefined,
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
	"\"isHtmlSingleFile\" of string \"true\" returns boolean true.",
	() =>
		expect(
			createParameterFromCliArguments({
				ignoreDirectoryNames: undefined,
				isHtmlSingleFile: "true",
				outputBaseFileName: undefined,
				outputDirectoryPath: undefined,
				packageNames: undefined,
				packagePrefix: undefined,
				packageScope: undefined,
				rootItemIdentifiers: undefined,
			})
			.isHtmlSingleFile,
		)
		.toEqual(
			true,
		),
);

test(
	"\"ignoreDirectoryNames\" of string returns array.",
	() =>
		expect(
			createParameterFromCliArguments({
				ignoreDirectoryNames: "ignore",
				isHtmlSingleFile: undefined,
				outputBaseFileName: undefined,
				outputDirectoryPath: undefined,
				packageNames: undefined,
				packagePrefix: undefined,
				packageScope: undefined,
				rootItemIdentifiers: undefined,
			})
			.ignoreDirectoryNames,
		)
		.toEqual(
			[ "ignore" ],
		),
);

test(
	"\"packageNames\", \"packagePrefix\" and \"packageScope\" are returned in packages.",
	() =>
		expect(
			createParameterFromCliArguments({
				ignoreDirectoryNames: undefined,
				isHtmlSingleFile: undefined,
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
				ignoreDirectoryNames: undefined,
				isHtmlSingleFile: undefined,
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
				directories: [ "directory1", "directory2" ],
				ignoreDirectoryNames: undefined,
				isHtmlSingleFile: undefined,
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