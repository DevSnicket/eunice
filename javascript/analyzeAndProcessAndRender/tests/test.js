// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	analyzeAndProcessAndRender = require(".."),
	fs = require("fs"),
	path = require("path"),
	{ promisify } = require("util");

const
	deleteFile = promisify(fs.unlink),
	fileExists = promisify(fs.exists),
	readFile = promisify(fs.readFile);

test(
	"Single source writes output files and expected YAML content.",
	async() => {
		const testDirectory = path.join(__dirname, "singleSource");

		await testInDirectory({
			sources:
				[ { directory: path.join(testDirectory, "source") } ],
			testDirectory,
		});
	},
);

test(
	"Single source with output base file name writes output files and expected YAML content.",
	async() => {
		const testDirectory = path.join(__dirname, "singleSourceWithOutputBaseFilename");

		await testInDirectory({
			baseFileName:
				"base",
			sources:
				[ { directory: path.join(testDirectory, "source") } ],
			testDirectory,
		});
	},
);

test(
	"Package source writes output files and expected YAML content.",
	async() => {
		const testDirectory = path.join(__dirname, "packageSource");

		await testInDirectory({
			packages:
				{
					directory: testDirectory,
					names: [ "package" ],
				},
			testDirectory,
		});
	},
);

async function testInDirectory({
	baseFileName = "",
	// undefined used to test default argument
	// eslint-disable-next-line no-undefined
	packages = undefined,
	sources = [],
	testDirectory,
}) {
	const outputDirectory = path.join(testDirectory, "output");

	const outputPaths =
		{
			html: path.join(outputDirectory, `${baseFileName}.html`),
			svg: path.join(outputDirectory, `${baseFileName}.svg`),
			yaml: path.join(outputDirectory, `${baseFileName}.yaml`),
		};

	await deleteOutput();

	await analyzeAndProcessAndRender({
		outputPath:
			{
				baseFileName,
				directoryPath: outputDirectory,
			},
		packages,
		sources,
	});

	expect(
		{
			htmlExists: await fileExists(outputPaths.html),
			svgExists: await fileExists(outputPaths.svg),
			yaml: await readYamlFile(outputPaths.yaml),
		},
	)
	.toEqual(
		{
			htmlExists: true,
			svgExists: true,
			yaml: await readYamlFile(path.join(testDirectory, "expected.yaml")),
		},
	);

	async function deleteOutput() {
		await Promise.all(
			Object.values(outputPaths)
			.map(
				async outputPath =>
					await fileExists(outputPath)
					&&
					deleteFile(outputPath),
			),
		);
	}

	function readYamlFile(
		file,
	) {
		return readFile(file, "utf-8");
	}
}