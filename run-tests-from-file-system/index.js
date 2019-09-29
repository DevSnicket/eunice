/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	addTestCaseToJest = require("./addTestCaseToJest"),
	discoverTestCases = require("./discoverTestCases"),
	fs = require("fs"),
	path = require("path"),
	readTextFile = require("./readTextFile");

module.exports =
	({
		action,
		addTestCase = addTestCaseToJest,
		caseFileName,
		directory,
		expectedFileName,
		processArguments,
	}) => {
		const testCases = discoverTestCases({ caseFileName, directory });

		if (processArguments.includes("update-expected"))
			for (const testCase of testCases)
				updateExpectedFileOfTestCase(testCase);
		else
			for (const testCase of testCases)
				addTestCase({
					getActualAndExpected:
						() => createActualAndExpected(testCase),
					name:
						testCase,
				});

		function updateExpectedFileOfTestCase(
			testCase,
		) {
			return (
				fs.writeFileSync(
					path.join(directory, testCase, expectedFileName),
					getActualForTestCase(testCase),
					"utf-8",
				)
			);
		}

		function createActualAndExpected(
			testCase,
		) {
			return (
				{
					actual:
						getActualForTestCase(testCase),
					expected:
						readTestCaseFile({
							fileName: expectedFileName,
							testCase,
						}),
				}
			);
		}

		function getActualForTestCase(
			testCase,
		) {
			return (
				action(
					readTestCaseFile({
						fileName: caseFileName,
						testCase,
					}),
				)
			);
		}

		function readTestCaseFile({
			fileName,
			testCase,
		}) {
			return readTextFile(path.join(directory, testCase, fileName));
		}
	};