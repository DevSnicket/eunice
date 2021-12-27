// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import analyzeAndProcessAndRender from "..";
import fileSystem from "fs-extra";
import path from "path";

test(
	"Output enabled for HTML and SVG writes files.",
	async() => {
		const testDirectory = path.join(__dirname, "outputEnabledForHtmlAndSvg");

		const outputDirectory = path.join(testDirectory, "output");

		await fileSystem.emptyDir(outputDirectory);

		await analyzeAndProcessAndRender({
			date:
				new Date(0),
			output:
				{
					enabled:
						{
							html: true,
							svg: true,
						},
					path:
						{
							baseFileName: "",
							directoryPath: outputDirectory,
						},
				},
			sources:
				[ { directory: path.join(testDirectory, "source") } ],
			version:
				"0.0.0",
		});

		expect(
			await fileSystem.readdir(outputDirectory),
		)
		.toEqual(
			[ ".html", ".svg" ],
		);

		expect(
			await fileSystem.readFile(
				path.join(outputDirectory, ".svg"),
				"utf-8",
			),
		)
		.toEqual(
			await fileSystem.readFile(
				path.join(testDirectory, "expected.svg"),
				"utf-8",
			),
		);
	},
);

test(
	"Single source writes expected YAML.",
	async() => {
		const testDirectory = path.join(__dirname, "singleSource");

		await testYamlInDirectory({
			sources:
				[ { directory: path.join(testDirectory, "source") } ],
			testDirectory,
		});
	},
);

test(
	"Single source with output base file name writes expected YAML.",
	async() => {
		const testDirectory = path.join(__dirname, "singleSourceWithOutputBaseFilename");

		await testYamlInDirectory({
			baseFileName:
				"base",
			sources:
				[ { directory: path.join(testDirectory, "source") } ],
			testDirectory,
		});
	},
);

test(
	"Package source writes expected YAML.",
	async() => {
		const testDirectory = path.join(__dirname, "packageSource");

		await testYamlInDirectory({
			packages:
				{
					directory: testDirectory,
					names: [ "package" ],
				},
			testDirectory,
		});
	},
);

async function testYamlInDirectory({
	baseFileName = "",
	// undefined used to test default argument
	// eslint-disable-next-line no-undefined
	packages = undefined,
	sources = [],
	testDirectory,
}) {
	const outputDirectory = path.join(testDirectory, "output");

	await fileSystem.emptyDir(outputDirectory);

	await analyzeAndProcessAndRender({
		date:
			new Date(0),
		output:
			{
				enabled:
					{ yaml: true },
				path:
					{
						baseFileName,
						directoryPath: outputDirectory,
					},
			},
		packages,
		sources,
		version:
			"0.0.0",
	});

	expect(
		await readYamlFile(
			path.join(outputDirectory, `${baseFileName}.yaml`),
		),
	)
	.toEqual(
		await readYamlFile(path.join(testDirectory, "expected.yaml")),
	);

	function readYamlFile(
		file,
	) {
		return fileSystem.readFile(file, "utf-8");
	}
}