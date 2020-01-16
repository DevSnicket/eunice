// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	compareIdentifierOrItemIdentifier = require("./compareIdentifierOrItemIdentifier"),
	flatMap = require("array.prototype.flatmap"),
	fs = require("fs"),
	getItemOrItemsFromJavascript = require("../getItemOrItemsFromJavascript"),
	getOrCreateFileItem = require("./getOrCreateFileItem"),
	path = require("path"),
	{ promisify } = require("util");

flatMap.shim();

const
	getFileStatus = promisify(fs.lstat),
	readDirectory = promisify(fs.readdir),
	readFile = promisify(fs.readFile);

module.exports =
	(/** @type {import("./Parameter.d")} */{
		babelParserPlugins,
		directory,
		fileExtensions = [ ".js" ],
		isCalleeIgnored,
		ignorePathPattern,
	}) =>
		withOptionsAndRootDirectory({
			babelParserPlugins,
			fileExtensions,
			ignorePathPattern,
			isCalleeIgnored,
			rootDirectory: directory,
		})
		.getOrCreateItemsInDirectory(
			"",
		);

function withOptionsAndRootDirectory({
	babelParserPlugins,
	ignorePathPattern,
	isCalleeIgnored,
	fileExtensions,
	rootDirectory,
}) {
	return { getOrCreateItemsInDirectory };

	async function getOrCreateItemsInDirectory(
		directoryPath,
	) {
		const directoryAbsolutePath =
			path.join(rootDirectory, directoryPath);

		return (
			(
				await Promise.all(
					(await readDirectory(directoryAbsolutePath))
					.map(createItemsFromFileOrSubdirectory),
				)
			)
			.flatMap(items => items || [])
			.sort(compareIdentifierOrItemIdentifier)
		);

		async function createItemsFromFileOrSubdirectory(
			fileOrSubdirectory,
		) {
			return (
				!isIgnored()
				&&
				(
					await createItemsWhenSubdirectory()
					||
					getOrCreateItemsWhenJavascriptFile()
				)
			);

			function isIgnored() {
				return (
					ignorePathPattern
					&&
					ignorePathPattern.test(
						path.join(directoryPath, fileOrSubdirectory),
					)
				);
			}

			async function getOrCreateItemsWhenJavascriptFile() {
				const fileOrSubdirectoryPath =
					path.parse(fileOrSubdirectory);

				return (
					isJavascript()
					&&
					[
						getOrCreateFileItem({
							directoryPath,
							filePath:
								fileOrSubdirectoryPath,
							itemOrItems:
								getItemOrItemsFromJavascriptOrRethrowErrorWithPath(
									await readFile(
										getFileOrSubdirectoryFull(),
										"utf-8",
									),
								),
						}),
					]
				);

				function isJavascript() {
					return fileExtensions.includes(fileOrSubdirectoryPath.ext);
				}

				function getItemOrItemsFromJavascriptOrRethrowErrorWithPath(
					javascript,
				) {
					try {
						return (
							getItemOrItemsFromJavascript({
								babelParserPlugins,
								directoryPath:
									{
										absolute: directoryAbsolutePath,
										relative: directoryPath,
									},
								fileExtensions,
								isCalleeIgnored,
								javascript,
							})
						);
					} catch (error) {
						throw new Error(`Analysis of file "${path.join(directoryPath, fileOrSubdirectory)}" raised the following error.\n\n${error.message}`);
					}
				}
			}

			async function createItemsWhenSubdirectory() {
				return (
					await isDirectory()
					&&
					getOrCreateItemsInDirectory(
						path.join(directoryPath, fileOrSubdirectory),
					)
				);

				async function isDirectory() {
					return (
						(await getFileStatus(getFileOrSubdirectoryFull()))
						.isDirectory()
					);
				}
			}

			function getFileOrSubdirectoryFull() {
				return (
					path.join(
						directoryAbsolutePath,
						fileOrSubdirectory,
					)
				);
			}
		}
	}
}