/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

import { existsSync, lstatSync, readdirSync } from "fs";
import path from "path";

export default ({
	caseFileName,
	directoryAbsolutePath: rootDirectoryAbsolutePath,
	expectedFileName,
}) => {
	return (
		withExpectedFilePathOfAncestor(
			getExpectedFilePathInRootWhenExists(),
		)
		.inRelativeDirectoryPath("")
	);

	function getExpectedFilePathInRootWhenExists() {
		const expectedFilePath =
			path.join(rootDirectoryAbsolutePath, expectedFileName);

		return existsSync(expectedFilePath) && expectedFilePath;
	}

	function withExpectedFilePathOfAncestor(
		expectedFilePathOfAncestor,
	) {
		return { inRelativeDirectoryPath };

		function inRelativeDirectoryPath(
			relativeDirectoryPath,
		) {
			return (
				getFilesAndSubdirectoryNames()
				.flatMap(inFileOrSubdirectoryName)
			);

			function getFilesAndSubdirectoryNames() {
				return (
					[
						...readdirSync(
							getAbsoluteForRelativePath(relativeDirectoryPath),
						),
					]
				);
			}

			function inFileOrSubdirectoryName(
				fileOrSubdirectoryName,
			) {
				return (
					whenRelativePathIsSubdirectory(
						path.join(relativeDirectoryPath, fileOrSubdirectoryName),
					)
					||
					[]
				);
			}
		}

		function whenRelativePathIsSubdirectory(
			relativePath,
		) {
			return (
				whenSubdirectory({
					absolutePath:
						getAbsoluteForRelativePath(relativePath),
					relativePath,
				})
			);
		}

		function getAbsoluteForRelativePath(
			relativePath,
		) {
			return path.join(rootDirectoryAbsolutePath, relativePath);
		}

		function whenSubdirectory({
			absolutePath,
			relativePath,
		}) {
			return (
				isDirectory()
				&&
				inSubdirectory({
					caseFilePath:
						getAbsolutePathForFileNameWhenExists(caseFileName),
					expectedFilePath:
						getAbsolutePathForFileNameWhenExists(expectedFileName)
						||
						expectedFilePathOfAncestor,
					relativePath,
				})
			);

			function isDirectory() {
				return (
					lstatSync(absolutePath)
					.isDirectory()
				);
			}

			function getAbsolutePathForFileNameWhenExists(
				fileName,
			) {
				const filePath = path.join(absolutePath, fileName);

				return existsSync(filePath) && filePath;
			}
		}

		function inSubdirectory({
			caseFilePath,
			expectedFilePath,
			relativePath,
		}) {
			return (
				[
					...createTestCaseWhenFilesExist(),
					...inSubdirectoriesOfSubdirectory(),
				]
			);

			function * createTestCaseWhenFilesExist() {
				if (caseFilePath && expectedFilePath)
					yield (
						{
							caseFilePath,
							expectedFilePath,
							name: relativePath,
						}
					);
			}

			function inSubdirectoriesOfSubdirectory() {
				return (
					withExpectedFilePathOfAncestor(
						expectedFilePath,
					)
					.inRelativeDirectoryPath(
						relativePath,
					)
				);
			}
		}
	}
};