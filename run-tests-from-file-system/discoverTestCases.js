/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

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