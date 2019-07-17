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
			subdirectory: "jest",
			// undefined used to get parameter default of Jest implementation
			// eslint-disable-next-line no-undefined
			test: undefined,
		});

		test(
			"Calls action with test case file content.",
			() => {
				const testCaseFileContents = [];

				runTestsAsInJestProcess({
					action:
						testCaseFileContent =>
							testCaseFileContents.push(testCaseFileContent),
					subdirectory:
						"multiple",
					test:
						() => null,
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
			subdirectory,
			test,
		}) {
			runTestsWithFileNames({
				action,
				directory:
					getTestCasesPathOfSubdirectory(subdirectory),
				log:
					null,
				processArguments:
					[ null, "jest" ],
				test,
			});
		}
	},
);

test(
	"Log actual of all test cases.",
	() => {
		const logged = [];

		runTestsWithFileNames({
			action:
				testCaseFileContent => `Actual for ${testCaseFileContent}`,
			directory:
				getTestCasesPathOfSubdirectory("multiple"),
			log:
				log => logged.push(log),
			processArguments:
				[ null, "" ],
			test:
				null,
		});

		expect(
			logged,
		)
		.toEqual(
			[
				path.join("directoryWithNoTestCase", "testCaseInDirectoryWithNoTestCase"),
				"Actual for source of test case in directory with no test case",
				"directoryWithTestCase",
				"Actual for source of directory with test case",
				path.join("directoryWithTestCase", "testCaseInDirectoryWithTestCase"),
				"Actual for source of test case in directory with test case",
				"testCaseInRoot",
				"Actual for source of test case in root",
			],
		);
	},
);

describe(
	"Log actual of specified test case.",
	() => {
		const expected = "Actual for source of test case in directory with test case";

		test(
			"Default logs to console.",
			() => {
				const originalConsole = global.console;

				global.console = { log: jest.fn() };

				logActualOfSpecifiedTestCase(
					// undefined used to get parameter default of console.log
					// eslint-disable-next-line no-undefined
					undefined,
				);

				expect(global.console.log)
				.toHaveBeenCalledWith(expected);

				global.console = originalConsole;
			},
		);

		test(
			"When log specified.",
			() => {
				const logged = [];

				logActualOfSpecifiedTestCase(
					log => logged.push(log),
				);

				expect(logged)
				.toEqual([ expected ]);
			},
		);

		function logActualOfSpecifiedTestCase(
			log,
		) {
			runTestsWithFileNames({
				action:
					testCaseFileContent => `Actual for ${testCaseFileContent}`,
				directory:
					getTestCasesPathOfSubdirectory("multiple"),
				log,
				processArguments:
					[
						null,
						"",
						path.join("directoryWithTestCase", "testCaseInDirectoryWithTestCase"),
					],
				test:
					null,
			});
		}
	},
);

test(
	"Three process parameters does nothing.",
	() =>
		runTestsWithFileNames({
			action: null,
			directory: null,
			log: null,
			processArguments: [ null, "", null ],
			test: null,
		}),
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
			directory,
			log:
				null,
			processArguments:
				[ null, "", "update-expected" ],
			test:
				null,
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
	directory,
	log,
	processArguments,
	test,
}) {
	runTestsFromFileSystem({
		action,
		caseFileName: "source.txt",
		directory,
		expectedFileName,
		log,
		processArguments,
		test,
	});
}

function getTestCasesPathOfSubdirectory(
	subdirectory,
) {
	return path.join(__dirname, "test-cases", subdirectory);
}