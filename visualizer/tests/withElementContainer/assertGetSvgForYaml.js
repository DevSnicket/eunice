// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import getSvgForStack from "../getSvgForStack";
import parseStackFromYaml from "../parseStackFromYaml";
import path from "path";
import { readFile } from "fs-extra";

export default async({
	elementContainerFactory,
	expectedSvgDirectoryPath,
	yamlDirectory,
}) =>
	expect(
		getSvgForStack({
			elementContainerFactory,
			stack:
				parseStackFromYaml(
					await readTestFile(
						path.join(__dirname, "..", "test-cases", yamlDirectory, ".yaml"),
					),
				),
		}),
	)
	.toEqual(
		await readTestFile(
			path.join(
				expectedSvgDirectoryPath,
				".svg",
			),
		),
	);

async function readTestFile(
	filePath,
) {
	const content =
		await readFile(
			filePath,
			"utf-8",
		);

	return (
		content
		.replace(
			/^\uFEFF/, // BOM
			"",
		)
	);
}