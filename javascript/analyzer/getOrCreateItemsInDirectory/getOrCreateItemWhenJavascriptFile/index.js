// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	fs = require("fs"),
	getItemOrItemsFromJavascript = require("../../getItemOrItemsFromJavascript"),
	getOrCreateFileItem = require("./getOrCreateFileItem"),
	path = require("path"),
	{ promisify } = require("util");

const readFile = promisify(fs.readFile);

module.exports =
	async({
		babelParserPlugins,
		directoryPath,
		fileExtensions,
		fileOrSubdirectoryPath,
		isCalleeIgnored,
	}) => {
		const
			{
				name: identifier,
				ext: fileOrSubdirectoryExtension,
			}
			= path.parse(fileOrSubdirectoryPath.name);

		return (
			isJavascript()
			&&
			[
				getOrCreateFileItem({
					identifier,
					itemOrItems:
						getItemOrItemsFromJavascriptOrRethrowErrorWithPath(
							await readFile(
								fileOrSubdirectoryPath.absolute,
								"utf-8",
							),
						),
				}),
			]
		);

		function isJavascript() {
			return (
				fileExtensions.includes(
					fileOrSubdirectoryExtension,
				)
			);
		}

		function getItemOrItemsFromJavascriptOrRethrowErrorWithPath(
			javascript,
		) {
			try {
				return (
					getItemOrItemsFromJavascript({
						babelParserPlugins,
						directoryPath,
						fileExtensions,
						isCalleeIgnored,
						javascript,
					})
				);
			} catch (error) {
				throw new Error(`Analysis of file "${path.join(directoryPath.relative, fileOrSubdirectoryPath.name)}" raised the following error.\n\n${error.message}`);
			}
		}
	};