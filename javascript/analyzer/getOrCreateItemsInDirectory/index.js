// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

require("array.prototype.flat")
.shim();

require("array.prototype.flatmap")
.shim();

const
	combineFileAndDirectoryItems = require("./combineFileAndDirectoryItems"),
	createItem = require("./createItem"),
	fs = require("fs"),
	getOrCreateItemWhenJavascriptFile = require("./getOrCreateItemWhenJavascriptFile"),
	path = require("path"),
	{ promisify } = require("util");

const
	getFileStatus = promisify(fs.lstat),
	readDirectory = promisify(fs.readdir);

module.exports =
	(/** @type {import("./Parameter.d")} */{
		babelParserPlugins,
		directory,
		fileExtensions = [ ".js" ],
		isCalleeIgnored,
		ignorePathPattern,
	}) =>
		withOptionsAndRootDirectory({
			getOrCreateItemWhenFile:
				({
					directoryPath,
					fileOrSubdirectoryPath,
				}) =>
					getOrCreateItemWhenJavascriptFile({
						babelParserPlugins,
						directoryPath,
						fileExtensions,
						fileOrSubdirectoryPath,
						isCalleeIgnored,
					}),
			ignorePathPattern,
			rootDirectory: directory,
		})
		.getOrCreateItemsInDirectory(
			"",
		);

function withOptionsAndRootDirectory({
	getOrCreateItemWhenFile,
	ignorePathPattern,
	rootDirectory,
}) {
	return { getOrCreateItemsInDirectory };

	async function getOrCreateItemsInDirectory(
		directoryPath,
	) {
		const directoryAbsolutePath =
			path.join(rootDirectory, directoryPath);

		return (
			combineFileAndDirectoryItems(
				(
					await Promise.all(
						(await readDirectory(directoryAbsolutePath))
						.sort()
						.flatMap(
							async fileOrSubdirectoryName =>
								await createItemFromFileOrSubdirectory(
									fileOrSubdirectoryName,
								)
								||
								[],
						),
					)
				)
				.flat(),
			)
		);

		async function createItemFromFileOrSubdirectory(
			fileOrSubdirectoryName,
		) {
			const fileOrSubdirectoryAbsolutePath =
				path.join(
					directoryAbsolutePath,
					fileOrSubdirectoryName,
				);

			return (
				!isIgnored()
				&&
				(
					await createItemWhenSubdirectory()
					||
					getOrCreateItemWhenFile({
						directoryPath:
							{
								absolute: directoryAbsolutePath,
								relative: directoryPath,
							},
						fileOrSubdirectoryPath:
							{
								absolute: fileOrSubdirectoryAbsolutePath,
								name: fileOrSubdirectoryName,
							},
					})
				)
			);

			function isIgnored() {
				return (
					ignorePathPattern
					&&
					ignorePathPattern.test(
						path.join(directoryPath, fileOrSubdirectoryName),
					)
				);
			}

			async function createItemWhenSubdirectory() {
				return (
					await isDirectory()
					&&
					createWhenAnyItems(
						await getOrCreateItemsInDirectory(
							path.join(directoryPath, fileOrSubdirectoryName),
						),
					)
				);

				async function isDirectory() {
					return (
						(await getFileStatus(fileOrSubdirectoryAbsolutePath))
						.isDirectory()
					);
				}

				function createWhenAnyItems(
					items,
				) {
					return (
						items.length
						&&
						createItem({
							identifier: fileOrSubdirectoryName,
							items: getItemWhenSingle() || items,
							type: "directory",
						})
					);

					function getItemWhenSingle() {
						return (
							items.length === 1
							&&
							items[0]
						);
					}
				}
			}
		}
	}
}