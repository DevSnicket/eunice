const
	fs = require("fs-extra"),
	getSourcePath = require("../getSourcePath"),
	path = require("path"),
	readDirectoryPathRecursive = require("./readDirectoryPathRecursive"),
	readTextFile = require("../readTextFile"),
	writeHarness = require("..");

const htmlFileName = "eunice.html";


test(
	"No includes writes output",
	() =>
		testInOutputDirectory({
			expectedFiles: [ htmlFileName ],
			includeServiceWorkers: false,
			includeSourceMap: false,
			outputDirectoryName: "no-includes",
		}),
);

test(
	"Both includes writes output",
	() =>
		testInOutputDirectory({
			expectedFiles:
				[
					htmlFileName,
					"harness.js.map",
					{
						"monaco-editor":
							[ { editor: [ "editor.worker.js", "editor.worker.js.map" ] } ],
					},
				],
			includeServiceWorkers:
				true,
			includeSourceMap:
				true,
			outputDirectoryName:
				"both-includes",
		}),
);

async function testInOutputDirectory({
	expectedFiles,
	includeServiceWorkers,
	includeSourceMap,
	outputDirectoryName,
}) {
	await throwErrorWhenSourceDoesNotExist();

	const directoryPath = path.join(__dirname, "output", outputDirectoryName);

	await fs.emptyDir(directoryPath);

	await writeHarness({
		directoryPath,
		htmlFileName,
		includeServiceWorkers,
		includeSourceMap,
		yamlFilePath:
			path.join(__dirname, ".yaml"),
	});

	expect({
		files: await readDirectoryPathRecursive(directoryPath),
		htmlFileContainsYamlFileContent: await readHtmlFileContainsYamlFileContent(),
	})
	.toEqual({
		files: expectedFiles,
		htmlFileContainsYamlFileContent: true,
	});

	async function throwErrorWhenSourceDoesNotExist() {
		const sourceDirectoryPath = getSourcePath(".");

		if (!await fs.pathExists(sourceDirectoryPath))
			throw Error(`Source directory "${sourceDirectoryPath}" not found. NPM package script "harness" must be run before this test.`);
	}

	async function readHtmlFileContainsYamlFileContent() {
		const html = await readTextFile(path.join(directoryPath, htmlFileName));

		return html.includes("test yaml file contents");
	}
}