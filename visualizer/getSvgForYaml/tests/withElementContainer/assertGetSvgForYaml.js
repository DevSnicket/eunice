// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	getSvgForYaml = require("../.."),
	path = require("path"),
	readTestFile = require("../../readTestFile");

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
						path.join(__dirname, "..", "test-cases", yamlDirectory, ".yaml"),
					),
			}),
		)
		.toEqual(
			readTestFile(
				path.join(
					expectedSvgDirectoryPath,
					".svg",
				),
			),
		);