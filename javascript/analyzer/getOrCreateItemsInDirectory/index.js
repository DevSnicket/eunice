/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	flatMap = require("array.prototype.flatmap"),
	fs = require("fs"),
	getItemOrItemsFromJavaScript = require("../getItemOrItemsFromJavaScript"),
	getOrCreateFileItem = require("./getOrCreateFileItem"),
	path = require("path");

flatMap.shim();

module.exports =
	({
		directory,
		ignoreDirectoryNames = null,
	}) =>
		getOrCreateItemsInRootedDirectory({
			directory: "",
			ignoreDirectoryNames,
			rootDirectory: directory,
		});

function getOrCreateItemsInRootedDirectory({
	directory,
	ignoreDirectoryNames,
	rootDirectory,
}) {
	const subDirectoryFull =
		path.join(rootDirectory, directory);

	return (
		// flatMap isn't shimmed onto the return array of fs functions when running in Jest
		flatMap(
			fs.readdirSync(subDirectoryFull),
			fileOrDirectory =>
				createItemsFromFileOrSubdirectory(fileOrDirectory)
				||
				[],
		)
		.sort(compareItemIdentifiers)
	);

	function createItemsFromFileOrSubdirectory(
		fileOrSubdirectory,
	) {
		return (
			createItemsWhenSubdirectory()
			||
			getOrCreateItemsWhenJavaScriptFile()
		);

		function getOrCreateItemsWhenJavaScriptFile() {
			const fileOrSubdirectoryPath =
				path.parse(fileOrSubdirectory);

			return (
				isJavaScript()
				&&
				[
					getOrCreateFileItem({
						directory,
						filePath:
							fileOrSubdirectoryPath,
						itemOrItems:
							getItemOrItemsFromJavaScriptOrRethrowErrorWithPath(
								readFile(),
							),
					}),
				]
			);

			function isJavaScript() {
				return fileOrSubdirectoryPath.ext === ".js";
			}

			function getItemOrItemsFromJavaScriptOrRethrowErrorWithPath(
				javaScript,
			) {
				try {
					return getItemOrItemsFromJavaScript(javaScript);
				} catch (error) {
					throw new Error(`Analysis of file "${path.join(directory, fileOrSubdirectory)}" raised the following error.\n\n${error.message}`);
				}
			}

			function readFile() {
				return (
					fs.readFileSync(
						getFileOrSubdirectoryFull(),
						"utf-8",
					)
				);
			}
		}

		function createItemsWhenSubdirectory() {
			return (
				isDirectory()
				&&
				!isIgnored()
				&&
				getOrCreateItemsInRootedDirectory({
					directory: path.join(directory, fileOrSubdirectory),
					ignoreDirectoryNames,
					rootDirectory,
				})
			);

			function isIgnored() {
				return (
					ignoreDirectoryNames
					&&
					ignoreDirectoryNames.includes(fileOrSubdirectory)
				);
			}

			function isDirectory() {
				return (
					fs.lstatSync(
						getFileOrSubdirectoryFull(),
					)
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

function compareItemIdentifiers(
	left,
	right,
) {
	const
		leftIdentifier = getIdentifier(left),
		rightIdentifier = getIdentifier(right);

	return (
		leftIdentifier !== rightIdentifier
		&&
		(leftIdentifier < rightIdentifier ? -1 : 1)
	);

	function getIdentifier(
		item,
	) {
		return (
			(item.id || item)
			.replace(
				new RegExp(getPathSeparatorEscaped(), "g"),
				String.fromCharCode(0),
			)
		);

		function getPathSeparatorEscaped() {
			return path.sep.replace("\\", "\\\\");
		}
	}
}