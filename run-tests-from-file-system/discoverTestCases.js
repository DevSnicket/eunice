/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	fs = require("fs"),
	path = require("path");

module.exports =
	({
		caseFileName,
		directory,
	}) => {
		return inSubdirectory("");

		function inSubdirectory(
			subdirectory,
		) {
			return (
				fs.readdirSync(path.join(directory, subdirectory))
				.reduce(
					(testCases, fileOrSubdirectoryName) =>
						appendFileOrSubdirectoryToTestCases({
							fileOrSubdirectory:
								path.join(subdirectory, fileOrSubdirectoryName),
							testCases,
						}),
					[],
				)
			);
		}

		function appendFileOrSubdirectoryToTestCases({
			fileOrSubdirectory,
			testCases,
		}) {
			return (
				isDirectory()
				?
				[
					...testCases,
					...getTestCasesWhenAny(),
					...inSubdirectory(fileOrSubdirectory),
				]
				:
				testCases
			);

			function isDirectory() {
				return (
					fs.lstatSync(path.join(directory, fileOrSubdirectory))
					.isDirectory()
				);
			}

			function * getTestCasesWhenAny() {
				if (fs.existsSync(path.join(directory, fileOrSubdirectory, caseFileName)))
					yield fileOrSubdirectory;
			}
		}
	};