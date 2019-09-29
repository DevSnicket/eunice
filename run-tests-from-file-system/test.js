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
			action: () => "expected of Jest test case",
			// undefined used to get parameter default of Jest implementation
			// eslint-disable-next-line no-undefined
			addTestCase: undefined,
			subdirectory: "jest",
		});

		test(
			"Action not called when get actual and expected is not called by test.",
			() => {
				const action = jest.fn();

				runTestsAsInJestProcess({
					action,
					addTestCase: () => null,
					subdirectory: "multiple",
				});

				expect(action)
				.toBeCalledTimes(0);
			},
		);

		test(
			"Action called with test case file content when get actual and expected called by test.",
			() => {
				const testCaseFileContents = [];

				runTestsAsInJestProcess({
					action:
						testCaseFileContent =>
							testCaseFileContents.push(testCaseFileContent),
					addTestCase:
						({ getActualAndExpected }) => getActualAndExpected(),
					subdirectory:
						"multiple",
				});

				expect(
					testCaseFileContents,
				)
				.toEqual(
					[
						"source of test case in directory with no test case",
						"source of directory with test case",
						"source of test case in directory with test case",
						"source of test case in root",
					],
				);
			},
		);

		function runTestsAsInJestProcess({
			action,
			addTestCase,
			subdirectory,
		}) {
			runTestsWithFileNames({
				action,
				addTestCase,
				directory:
					getTestCasesPathOfSubdirectory(subdirectory),
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
			directory = getTestCasesPathOfSubdirectory("update"),
			sourceDirectory = getTestCasesPathOfSubdirectory("multiple");

		await emptyDir(directory);

		await copy(sourceDirectory, directory);

		runTestsWithFileNames({
			action:
				testCaseFileContent =>
					`Updated ${testCaseFileContent}`,
			addTestCase:
				null,
			directory,
			processArguments:
				[ null, "", "update-expected" ],
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
					path.join(directory, ...subdirectories, expectedFileName),
					"utf-8",
				)
			);
		}
	},
);

function runTestsWithFileNames({
	action,
	addTestCase,
	directory,
	processArguments,
}) {
	runTestsFromFileSystem({
		action,
		addTestCase,
		caseFileName: "source.txt",
		directory,
		expectedFileName,
		processArguments,
	});
}

function getTestCasesPathOfSubdirectory(
	subdirectory,
) {
	return path.join(__dirname, "test-cases", subdirectory);
}