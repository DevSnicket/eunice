/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	addTestCaseToJest = require("./addTestCaseToJest"),
	discoverTestCases = require("./discoverTestCases"),
	{ writeFile } = require("fs-extra"),
	readTextFile = require("./readTextFile");

module.exports =
	({
		addTestCase = addTestCaseToJest,
		caseFileName,
		directory,
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
					directory,
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
			getActualForTestCase(await readTextFile(caseFilePath)),
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
					actual:
						getActualForTestCase(
							await readTextFile(caseFilePath),
						),
					expected:
						await readTextFile(expectedFilePath),
				}
			);
		}
	}
}