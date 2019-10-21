/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

require("array.prototype.flatMap")
.shim();

const
	{ existsSync, lstatSync, readdirSync } = require("fs"),
	path = require("path");

module.exports =
	({
		caseFileName,
		directoryAbsolutePath: rootDirectory,
		expectedFileName,
	}) => {
		return inDirectory("");

		function inDirectory(
			directory,
		) {
			return (
				getFilesAndSubdirectoryNames()
				.flatMap(inFileOrSubdirectoryName)
			);

			function getFilesAndSubdirectoryNames() {
				return (
					[
						...readdirSync(
							path.join(rootDirectory, directory),
						),
					]
				);
			}

			function inFileOrSubdirectoryName(
				fileOrSubdirectoryName,
			) {
				return (
					whenSubdirectory(
						path.join(directory, fileOrSubdirectoryName),
					)
					||
					[]
				);
			}
		}

		function whenSubdirectory(
			fileOrSubdirectory,
		) {
			const testCaseDirectoryPath = path.join(rootDirectory, fileOrSubdirectory);

			return (
				isDirectory()
				&&
				[
					...getTestCaseExists(),
					...inDirectory(fileOrSubdirectory),
				]
			);

			function isDirectory() {
				return (
					lstatSync(testCaseDirectoryPath)
					.isDirectory()
				);
			}

			function * getTestCaseExists() {
				const caseFilePath = path.join(testCaseDirectoryPath, caseFileName);

				if (existsSync(caseFilePath))
					yield (
						{
							caseFilePath,
							expectedFilePath:
								path.join(testCaseDirectoryPath, expectedFileName),
							name:
								fileOrSubdirectory,
						}
					);
			}
		}
	};