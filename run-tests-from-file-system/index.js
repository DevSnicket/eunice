/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

import addTestCaseToJest from "./addTestCaseToJest";
import discoverTestCases from "./discoverTestCases";
import { writeFile } from "fs-extra";
import readTextFile from "./readTextFile";

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