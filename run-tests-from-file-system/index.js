/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

/* eslint-disable no-console */

const fs = require("fs");

const
	isJestProcessFromArguments = require("./isJestProcessFromArguments"),
	readTextFile = require("./readTextFile");

module.exports =
	({
		action,
		caseFileName,
		directory: rootDirectory,
		expectedFileName,
		processArguments,
	}) => {
		if (isJestProcessFromArguments(processArguments))
			discoverAndDescribeTestCases();
		else if (processArguments.length === 3)
			if (processArguments[2] === "update-expected")
				discoverAndUpdateExpectedFiles();
			else
				logOutputOfActualWhenFileOrTestCase(processArguments[2]);
		else
			discoverAndLogOutputOfActual();

		function discoverAndDescribeTestCases() {
			for (const testCase of discover())
				describeTestCase(testCase);

			function describeTestCase(
				testCase,
			) {
				test(
					testCase,
					() =>
						expect(
							getActualForTestCase(testCase),
						)
						.toBe(
							readTestCaseFile({
								fileName: expectedFileName,
								testCase,
							}),
						),
				);
			}
		}

		function discoverAndUpdateExpectedFiles() {
			for (const testCase of discover())
				updateExpectedFile({
					content: getActualForTestCase(testCase),
					testCase,
				});

			function updateExpectedFile({
				content,
				testCase,
			}) {
				return (
					fs.writeFileSync(
						`${rootDirectory}${testCase}/${expectedFileName}`,
						content,
						"utf-8",
					)
				);
			}
		}

		function discoverAndLogOutputOfActual() {
			for (const testCase of discover()) {
				console.log(testCase);
				console.log(getActualForTestCase(testCase));
			}
		}

		function discover() {
			return inSubdirectory("");

			function inSubdirectory(
				directory,
			) {
				return (
					fs.readdirSync(rootDirectory + directory)
					.map(
						subFileOrDirectory =>
							directory + subFileOrDirectory,
					)
					.map(
						subFileOrDirectory =>
							[
								fs.existsSync(`${rootDirectory}${subFileOrDirectory}/${caseFileName}`) && subFileOrDirectory,
								...whenSubdirectory(subFileOrDirectory),
							]
							.filter(testCases => testCases),
					)
					.reduce(
						(aggregation, testCases) =>
							[ ...aggregation, ...testCases ],
					)
				);
			}

			function whenSubdirectory(
				subFileOrDirectory,
			) {
				return isDirectory() ? discoverTestCases() : [];

				function isDirectory() {
					return (
						fs.lstatSync(rootDirectory + subFileOrDirectory)
						.isDirectory()
					);
				}

				function discoverTestCases() {
					return inSubdirectory(`${subFileOrDirectory}/`);
				}
			}
		}

		function logOutputOfActualWhenFileOrTestCase(
			fileOrTestCase,
		) {
			if (fileOrTestCase)
				console.log(
					isArgumentPath()
					?
					action(readTextFile(fileOrTestCase))
					:
					getActualForTestCase(fileOrTestCase),
				);

			function isArgumentPath() {
				return (
					fileOrTestCase.length > 1
					&&
					(fileOrTestCase[0] === "." || fileOrTestCase[0] === "/")
				);
			}
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
			return readTextFile(`${rootDirectory}${testCase}/${fileName}`);
		}
	};