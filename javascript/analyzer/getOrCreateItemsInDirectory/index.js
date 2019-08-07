/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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
		ignorePathPattern,
		ignoreStaticMethodsOf,
	}) =>
		withOptionsAndRootDirectory({
			babelParserPlugins,
			ignorePathPattern,
			ignoreStaticMethodsOf,
			rootDirectory: directory,
		})
		.getOrCreateItemsInDirectory(
			"",
		);

function withOptionsAndRootDirectory({
	babelParserPlugins,
	ignorePathPattern,
	ignoreStaticMethodsOf,
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
								ignoreStaticMethodsOf,
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