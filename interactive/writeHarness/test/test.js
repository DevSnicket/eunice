/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	{ emptyDir, pathExists } = require("fs-extra"),
	getSourcePath = require("../getSourcePath"),
	path = require("path"),
	readDirectoryPathRecursive = require("./readDirectoryPathRecursive"),
	readTextFile = require("../../readTextFile"),
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

	await emptyDir(directoryPath);

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

		if (!await pathExists(sourceDirectoryPath))
			throw Error(`Source directory "${sourceDirectoryPath}" not found. NPM package script "harness" must be run before this test.`);
	}

	async function readHtmlFileContainsYamlFileContent() {
		const html = await readTextFile(path.join(directoryPath, htmlFileName));

		return html.includes("\"test yaml file contents\\non multiple lines with a quote character \\\"\"");
	}
}