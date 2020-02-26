// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat";

import combineFileAndDirectoryItems from "./combineFileAndDirectoryItems";
import flatMap from "core-js/features/array/flat-map";
import fs from "fs";
import getItemOrItemsFromJavascript from "../getItemOrItemsFromJavascript";
import getOrCreateItemWhenJavascriptFile from "./getOrCreateItemWhenJavascriptFile";
import getWhenSingle from "./getWhenSingle";
import path from "path";
import { promisify } from "util";

const
	getFileStatus = promisify(fs.lstat),
	readDirectory = promisify(fs.readdir);

export default
async(/** @type {import("./Parameter.d")} */{
	areFilesBottomUp,
	babelParserPlugins,
	directory,
	fileExtensions = [ ".js" ],
	isCalleeIgnored,
	ignorePathPattern,
	rootItemIdentifier,
}) => {
	return (
		createRootItemWhenHasIdentifier({
			identifier: rootItemIdentifier,
			items: await getOrCreateItemsInRoot(),
		})
	);

	function getOrCreateItemsInRoot() {
		return (
			withOptionsAndRootDirectory({
				getOrCreateItemWhenFile,
				ignorePathPattern,
				rootDirectory:
					{
						name: rootItemIdentifier,
						path: directory,
					},
			})
			.getOrCreateItemsInDirectory(
				"",
			)
		);

		function getOrCreateItemWhenFile({
			directoryPath,
			fileOrSubdirectoryPath,
		}) {
			return (
				getOrCreateItemWhenJavascriptFile({
					directoryPath,
					fileExtensions,
					fileOrSubdirectoryPath,
					getItemOrItemsFromJavascript:
						javascript =>
							getItemOrItemsFromJavascript({
								babelParserPlugins,
								directoryPath,
								fileExtensions,
								isBottomUp:
									areFilesBottomUp,
								isCalleeIgnored,
								javascript,
							}),
				})
			);
		}
	}
};

function withOptionsAndRootDirectory({
	getOrCreateItemWhenFile,
	ignorePathPattern,
	rootDirectory,
}) {
	return { getOrCreateItemsInDirectory };

	async function getOrCreateItemsInDirectory(
		directoryRelativePath,
	) {
		const
			directoryAbsolutePath =
				path.join(
					rootDirectory.path,
					directoryRelativePath,
				);

		return (
			combineFileAndDirectoryItems(
				(
					await Promise.all(
						flatMap(
							(await readDirectory(directoryAbsolutePath))
							.sort(),
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
								relative: getDirectoryRelativePathForFile(),
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
						path.join(directoryRelativePath, fileOrSubdirectoryName),
					)
				);
			}

			async function createItemWhenSubdirectory() {
				return (
					await isDirectory()
					&&
					createWhenAnyItems(
						await getOrCreateItemsInDirectory(
							path.join(directoryRelativePath, fileOrSubdirectoryName),
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
						createDirectoryItem({
							identifier: fileOrSubdirectoryName,
							items,
						})
					);
				}
			}

			function getDirectoryRelativePathForFile() {
				return (
					whenHasRootDirectoryName()
					||
					directoryRelativePath
				);

				function whenHasRootDirectoryName() {
					return (
						rootDirectory.name
						&&
						path.join(rootDirectory.name, directoryRelativePath)
					);
				}
			}
		}
	}
}

function createRootItemWhenHasIdentifier({
	identifier,
	items,
}) {
	return (
		whenHasIdentifier()
		||
		getWhenSingle(items)
		||
		whenHasItems()
		||
		null
	);

	function whenHasIdentifier() {
		return (
			identifier
			&&
			createDirectoryItem({
				identifier,
				items,
			})
		);
	}

	function whenHasItems() {
		return items.length && items;
	}
}

function createDirectoryItem({
	identifier,
	items,
}) {
	return (
		{
			id: identifier,
			type: "directory",
			// needs to match expected key order in YAML.
			// eslint-disable-next-line sort-keys
			...createItemsPropertyWhenAny(),
		}
	);

	function createItemsPropertyWhenAny() {
		return (
			items.length
			&&
			{ items: getWhenSingle(items) || items }
		);
	}
}