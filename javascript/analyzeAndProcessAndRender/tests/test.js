/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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