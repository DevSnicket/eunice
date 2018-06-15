const fs = require("fs");

module.exports =
	function runTestsInFileSystem({
		action,
		argument,
		caseFileName,
		directory: rootDirectory,
		expectedFileName,
	}) {
		if (argument == "update-expected")
			updateExpectedFiles();
		else if (argument)
			// eslint-disable-next-line no-console
			console.log(
				isArgumentPath()
				?
				action(readFile(argument))
				:
				getActualForTestCase(argument)
			);
		else
			discoverAndDescribeTestCases();

		function isArgumentPath() {
			return (
				argument.length > 1
				&&
				(argument[0] == "." || argument[0] == "/")
			);
		}

		function discoverAndDescribeTestCases() {
			for (const testCase of discover())
				describeTestCase(testCase);

			function describeTestCase(
				testCase
			) {
				describe(
					"getSvgElementForYaml",
					() =>
						it(
							testCase,
							() =>
								expect(
									getActualForTestCase(testCase)
								)
								.toBe(
									readTestCaseFile({
										fileName: expectedFileName,
										testCase,
									})
								)
						)
				);
			}
		}

		function updateExpectedFiles() {
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
						`\uFEFF${content}`,
						"utf-8"
					));
			}
		}

		function discover() {
			return inSubdirectory("");

			function inSubdirectory(
				directory
			) {
				return (
					fs.readdirSync(rootDirectory + directory)
					.map(
						subFileOrDirectory =>
							directory + subFileOrDirectory
					)
					.map(
						subFileOrDirectory =>
							[
								fs.existsSync(`${rootDirectory}${subFileOrDirectory}/${caseFileName}`) && subFileOrDirectory,
								...whenSubdirectory(subFileOrDirectory),
							]
							.filter(testCases => testCases)
					)
					.reduce(
						(aggregation, testCases) =>
							[ ...aggregation, ...testCases ]
					));
			}

			function whenSubdirectory(
				subFileOrDirectory
			) {
				return isDirectory() ? discoverTestCases() : [];

				function isDirectory() {
					return (
						fs.lstatSync(rootDirectory + subFileOrDirectory)
						.isDirectory());
				}

				function discoverTestCases() {
					return inSubdirectory(`/${subFileOrDirectory}/`);
				}
			}
		}

		function getActualForTestCase(
			testCase
		) {
			return (
				action(
					readTestCaseFile({
						fileName: caseFileName,
						testCase,
					})
				)
			);
		}

		function readTestCaseFile({
			fileName,
			testCase,
		}) {
			return readFile(`${rootDirectory}${testCase}/${fileName}`);
		}

		function readFile(
			filePath
		) {
			return (
				fs.readFileSync(
					filePath,
					"utf-8"
				)
				.replace(
					/^\uFEFF/, // BOM
					""
				));
		}
	};