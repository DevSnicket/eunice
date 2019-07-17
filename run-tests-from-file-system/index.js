/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	fs = require("fs"),
	testWithJest = require("./testWithJest");

const
	isJestProcessFromArguments = require("./isJestProcessFromArguments"),
	path = require("path"),
	readTextFile = require("./readTextFile");

module.exports =
	({
		action,
		caseFileName,
		directory: rootDirectory,
		expectedFileName,
		// console is only used as a parameter default
		/* eslint-disable-next-line no-console */
		log = console.log,
		processArguments,
		test = testWithJest,
	}) => {
		if (isJestProcessFromArguments(processArguments))
			discoverAndDescribeTestCases();
		else if (processArguments.length === 3)
			if (processArguments[2] === "update-expected")
				discoverAndUpdateExpectedFiles();
			else
				logActualWhenFileOrTestCase(processArguments[2]);
		else
			discoverAndLogOutputOfActual();

		function discoverAndDescribeTestCases() {
			for (const testCase of discover())
				describeTestCase(testCase);

			function describeTestCase(
				testCase,
			) {
				test({
					actual:
						getActualForTestCase(testCase),
					expected:
						readTestCaseFile({
							fileName: expectedFileName,
							testCase,
						}),
					name:
						testCase,
				});
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
						path.join(rootDirectory, testCase, expectedFileName),
						content,
						"utf-8",
					)
				);
			}
		}

		function discoverAndLogOutputOfActual() {
			for (const testCase of discover()) {
				log(testCase);
				log(getActualForTestCase(testCase));
			}
		}

		function discover() {
			return inSubdirectory("");

			function inSubdirectory(
				subdirectory,
			) {
				return (
					fs.readdirSync(path.join(rootDirectory, subdirectory))
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
						fs.lstatSync(path.join(rootDirectory, fileOrSubdirectory))
						.isDirectory()
					);
				}

				function * getTestCasesWhenAny() {
					if (fs.existsSync(path.join(rootDirectory, fileOrSubdirectory, caseFileName)))
						yield fileOrSubdirectory;
				}
			}
		}

		function logActualWhenFileOrTestCase(
			fileOrTestCase,
		) {
			if (fileOrTestCase)
				log(getActualForTestCase(fileOrTestCase));
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
			return readTextFile(path.join(rootDirectory, testCase, fileName));
		}
	};