/* Eunice
Copyright (c) 2018 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import addTestCaseToJest from "./addTestCaseToJest";
import discoverTestCases from "./discoverTestCases";
import readTextFile from "./readTextFile";
import { writeFile } from "fs-extra";

export default ({
	addTestCase = addTestCaseToJest,
	caseFileName,
	directoryAbsolutePath,
	expectedFileName,
	getActualForTestCase,
	processArguments,
}) =>
	updateExpectedOfOrCallAddForTestCases({
		addTestCase,
		getActualForTestCase,
		isUpdateExpectedFiles:
			processArguments.includes("update-expected-files"),
		testCases:
			discoverTestCases({
				caseFileName,
				directoryAbsolutePath,
				expectedFileName,
			}),
	});

async function updateExpectedOfOrCallAddForTestCases({
	addTestCase,
	getActualForTestCase,
	isUpdateExpectedFiles,
	testCases,
}) {
	if (isUpdateExpectedFiles)
		await Promise.all(
			testCases.map(updateExpectedOfTestCase),
		);
	else
		for (const testCase of testCases)
			callAddForTestCase(testCase);

	async function updateExpectedOfTestCase({
		caseFilePath,
		expectedFilePath,
	}) {
		await writeFile(
			expectedFilePath,
			await readTestCaseAndGetActual(caseFilePath),
			"utf-8",
		);
	}

	function callAddForTestCase({
		caseFilePath,
		expectedFilePath,
		name,
	}) {
		addTestCase({
			getActualAndExpected,
			name,
		});

		async function getActualAndExpected() {
			return (
				{
					actual: await readTestCaseAndGetActual(caseFilePath),
					expected: await readTextFile(expectedFilePath),
				}
			);
		}
	}

	async function readTestCaseAndGetActual(
		caseFilePath,
	) {
		return (
			getActualForTestCase({
				content: await readTextFile(caseFilePath),
				fileAbsolutePath: caseFilePath,
			})
		);
	}
}