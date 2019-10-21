/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	{ copy, emptyDir, readFile } = require("fs-extra"),
	path = require("path"),
	runTestsFromFileSystem = require(".");

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
						testCase => `actual for ${testCase}`,
					subdirectory:
						"multiple",
				});

				expect(
					await Promise.all(getActualAndExpectedPromises),
				)
				.toEqual(
					[
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
				testCaseFileContent =>
					`Updated ${testCaseFileContent}`,
			processArguments:
				[ null, "", "update-expected-files" ],
		});

		expect({
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