const
	getSvgForYaml = require(".."),
	path = require("path"),
	readTestFile = require("../readTestFile");

module.exports =
	({
		elementContainerFactory,
		expectedSvgDirectoryPath,
		yamlDirectory,
	}) =>
		expect(
			getSvgForYaml({
				elementContainerFactory,
				yaml:
					readTestFile(
						path.join(__dirname, "..", "testCases", yamlDirectory, ".yaml"),
					),
			}),
		)
		.toEqual(
			readTestFile(
				path.join(
					expectedSvgDirectoryPath,
					"expected.svg",
				),
			),
		);