// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { emptyDir, pathExists } from "fs-extra";
import path from "path";
import readDirectoryPathRecursive from "./readDirectoryPathRecursive";
import readTextFile from "../../readTextFile";
import writeHarness from "..";

const htmlFileName = "eunice.html";

test.each(
	[
		[
			false,
			[ htmlFileName ],
		],
		[
			true,
			[
				htmlFileName,
				{
					"monaco-editor":
						[ {
							editor:
								[
									"editor.worker.js",
									"editor.worker.js.map",
								],
						} ],
				},
			],
		],
	],
)(
	"includeServiceWorkers %s outputs %j",
	async(
		includeServiceWorkers,
		expectedFiles,
	) => {
		const sourceDirectoryPath = path.join(__dirname, "..", "..", "dist");

		if (!await pathExists(sourceDirectoryPath))
			throw Error(`Source directory "${sourceDirectoryPath}" not found. NPM package script "build" must be run before this test.`);

		const directoryPath = path.join(__dirname, "output", `includeServiceWorkers=${includeServiceWorkers}`);

		await emptyDir(directoryPath);

		await writeHarness({
			directoryPath,
			htmlFileName,
			includeServiceWorkers,
			isInferStacksEnabled:
				false,
			sourceDirectoryPath,
			yaml:
				await readTextFile(
					path.join(__dirname, ".yaml"),
				),
		});

		expect({
			files: await readDirectoryPathRecursive(directoryPath),
			htmlFileContainsYamlFileContent: await readHtmlFileContainsYamlFileContent(),
		})
		.toEqual({
			files: expectedFiles,
			htmlFileContainsYamlFileContent: true,
		});

		async function readHtmlFileContainsYamlFileContent() {
			const html = await readTextFile(path.join(directoryPath, htmlFileName));

			return html.includes("\"test yaml file contents\\non multiple lines with a quote character \\\"\"");
		}
	},
);