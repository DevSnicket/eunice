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
		isCalleeIgnored,
		ignorePathPattern,
	}) =>
		withOptionsAndRootDirectory({
			babelParserPlugins,
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
	rootDirectory,
}) {
	return { getOrCreateItemsInDirectory };

	async function getOrCreateItemsInDirectory(
		directory,
	) {
		const subDirectoryFull =
			path.join(rootDirectory, directory);

		return (
			(
				await Promise.all(
					(await readDirectory(subDirectoryFull))
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
						path.join(directory, fileOrSubdirectory),
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
							directory,
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
					return fileOrSubdirectoryPath.ext === ".js";
				}

				function getItemOrItemsFromJavascriptOrRethrowErrorWithPath(
					javascript,
				) {
					try {
						return (
							getItemOrItemsFromJavascript({
								babelParserPlugins,
								isCalleeIgnored,
								javascript,
							})
						);
					} catch (error) {
						throw new Error(`Analysis of file "${path.join(directory, fileOrSubdirectory)}" raised the following error.\n\n${error.message}`);
					}
				}
			}

			async function createItemsWhenSubdirectory() {
				return (
					await isDirectory()
					&&
					getOrCreateItemsInDirectory(
						path.join(directory, fileOrSubdirectory),
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
						subDirectoryFull,
						fileOrSubdirectory,
					)
				);
			}
		}
	}
}