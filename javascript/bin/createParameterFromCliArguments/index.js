/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createOutputPath = require("./createOutputPath"),
	createSources = require("./createSources");

module.exports =
	({
		babelParserPlugins,
		directories = ".",
		ignorePathPattern,
		isFileContentReversed,
		isHtmlSingleFile,
		outputBaseFileName,
		outputDirectoryPath,
		packageNames,
		packagePrefix,
		packageScope,
		rootItemIdentifiers,
		...restOfOptions
	}) => (
		{
			...restOfOptions,
			babelParserPlugins:
				ensureArray(babelParserPlugins),
			ignorePathPattern:
				ignorePathPattern
				&&
				new RegExp(ignorePathPattern),
			isFileContentReversed:
				parseBoolean(isFileContentReversed),
			isHtmlSingleFile:
				parseBoolean(isHtmlSingleFile),
			outputPath:
				createOutputPath({
					outputBaseFileName,
					outputDirectoryPath,
				}),
			packages:
				(packageNames || packagePrefix || packageScope)
				&&
				{
					names: ensureArray(packageNames),
					prefix: packagePrefix,
					scope: packageScope,
				},
			sources:
				[
					...createSources({
						directories,
						rootItemIdentifiers,
					}),
				],
		}
	);

function ensureArray(
	argument,
) {
	return (
		// property wont be defined by minimalist package
		// eslint-disable-next-line no-undefined
		argument === undefined || Array.isArray(argument)
		?
		argument
		:
		[ argument ]
	);
}

function parseBoolean(
	value,
) {
	return value && value === "true";
}