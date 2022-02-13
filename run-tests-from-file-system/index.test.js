/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import { copy, emptyDir, readFile } from "fs-extra";
import path from "path";
import runTestsFromFileSystem from ".";

const expectedFileName = "expected.txt";

describe(
	"Jest process",
	() => {
		runTestsAsInJestProcess({
			// undefined used to get parameter default of Jest implementation
			// eslint-disable-next-line no-undefined
			addTestCase: undefined,
			getActualForTestCase: () => "expected of Jest test case",
			subdirectory: "jest",
		});

		test(
			"Test cases are discovered and read, and getActualForTestCase is called for each.",
			async() => {
				const getActualAndExpectedPromises = [];

				runTestsAsInJestProcess({
					addTestCase:
						({ getActualAndExpected }) =>
							getActualAndExpectedPromises.push(getActualAndExpected()),
					getActualForTestCase:
						({ content }) => `actual for ${content}`,
					subdirectory:
						"multiple",
				});

				expect(
					await Promise.all(getActualAndExpectedPromises),
				)
				.toEqual(
					[
						{
							actual: "actual for source of test case with no expected in directory with expected",
							expected: "expected of test case in directory with no test case and sub-directory with test case",
						},
						{
							actual: "actual for source of test case in directory with no test case",
							expected: "expected of test case in directory with no test case",
						},
						{
							actual: "actual for source of directory with test case",
							expected: "expected of directory with test case",
						},
						{
							actual: "actual for source of test case in directory with test case",
							expected: "expected of test case in directory with test case",
						},
						{
							actual: "actual for source of test case in root",
							expected: "expected of test case in root",
						},
						{
							actual: "actual for source of test case in directory with no expected in root directory with expected",
							expected: "expected of test case in root directory with no test case and sub-directory with test case",
						},
					],
				);
			},
		);

		function runTestsAsInJestProcess({
			addTestCase,
			getActualForTestCase,
			subdirectory,
		}) {
			runTestsWithFileNames({
				addTestCase,
				directoryAbsolutePath:
					getTestCasesPathOfSubdirectory(subdirectory),
				getActualForTestCase,
				processArguments:
					[ null, "jest" ],
			});
		}
	},
);

test(
	"Update expected",
	async() => {
		const
			directoryAbsolutePath = getTestCasesPathOfSubdirectory("update"),
			sourceDirectory = getTestCasesPathOfSubdirectory("multiple");

		await emptyDir(directoryAbsolutePath);

		await copy(sourceDirectory, directoryAbsolutePath);

		await runTestsWithFileNames({
			addTestCase:
				null,
			directoryAbsolutePath,
			getActualForTestCase:
				({ content }) =>
					`Updated ${content}`,
			processArguments:
				[ null, "", "update-expected-files" ],
		});

		expect({
			directoryWithExpectedAndNoTestCase:
				await readExpectedInSubdirectories(
					"directoryWithExpectedAndNoTestCase",
				),
			"directoryWithNoTestCase/testCaseInDirectoryWithNoTestCase":
				await readExpectedInSubdirectories(
					"directoryWithNoTestCase",
					"testCaseInDirectoryWithNoTestCase",
				),
			directoryWithTestCase:
				await readExpectedInSubdirectories(
					"directoryWithTestCase",
				),
			"directoryWithTestCase/testCaseInDirectoryWithTestCase":
				await readExpectedInSubdirectories(
					"directoryWithTestCase",
					"testCaseInDirectoryWithTestCase",
				),
			testCaseInRoot:
				await readExpectedInSubdirectories(
					"testCaseInRoot",
				),
		})
		.toEqual({
			directoryWithExpectedAndNoTestCase:
				"Updated source of test case with no expected in directory with expected",
			"directoryWithNoTestCase/testCaseInDirectoryWithNoTestCase":
				"Updated source of test case in directory with no test case",
			directoryWithTestCase:
				"Updated source of directory with test case",
			"directoryWithTestCase/testCaseInDirectoryWithTestCase":
				"Updated source of test case in directory with test case",
			testCaseInRoot:
				"Updated source of test case in root",
		});

		function readExpectedInSubdirectories(
			...subdirectories
		) {
			return (
				readFile(
					path.join(directoryAbsolutePath, ...subdirectories, expectedFileName),
					"utf-8",
				)
			);
		}
	},
);

async function runTestsWithFileNames({
	addTestCase,
	directoryAbsolutePath,
	getActualForTestCase,
	processArguments,
}) {
	await runTestsFromFileSystem({
		addTestCase,
		caseFileName: "source.txt",
		directoryAbsolutePath,
		expectedFileName,
		getActualForTestCase,
		processArguments,
	});
}

function getTestCasesPathOfSubdirectory(
	subdirectory,
) {
	return path.join(__dirname, "test-cases", subdirectory);
}