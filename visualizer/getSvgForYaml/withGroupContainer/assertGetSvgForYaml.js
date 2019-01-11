const
	getSvgForYaml = require(".."),
	path = require("path"),
	readTestFile = require("../readTestFile");

module.exports =
	({
		expectedSvgDirectoryPath,
		groupContainerFactory,
		yamlDirectory,
	}) =>
		expect(
			getSvgForYaml({
				groupContainerFactory,
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