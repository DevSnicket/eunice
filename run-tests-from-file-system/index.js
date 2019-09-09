/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	discoverTestCases = require("./discoverTestCases"),
	fs = require("fs"),
	path = require("path"),
	readTextFile = require("./readTextFile"),
	testWithJest = require("./testWithJest");

module.exports =
	({
		action,
		caseFileName,
		directory,
		expectedFileName,
		processArguments,
		test = testWithJest,
	}) => {
		const testCases = discoverTestCases({ caseFileName, directory });

		if (processArguments.includes("update-expected"))
			for (const testCase of testCases)
				updateExpectedFileOfTestCase(testCase);
		else
			for (const testCaseDirectoryPath of testCases)
				testTestCase(testCaseDirectoryPath);

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

		function testTestCase(
			testCase,
		) {
			test({
				getActualAndExpected:
					() => (
						{
							actual:
								getActualForTestCase(testCase),
							expected:
								readTestCaseFile({
									fileName: expectedFileName,
									testCase,
								}),
						}
					),
				name:
					testCase,
			});
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