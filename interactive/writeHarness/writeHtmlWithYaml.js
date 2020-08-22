// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import getStringLiteral from "@devsnicket/eunice-test-harnesses/getStringLiteral";
import path from "path";
import readTextFile from "../readTextFile";
import { writeFile } from "fs-extra";

export default async({
	areDependenciesOfAncestorsIncluded,
	directoryPath,
	htmlFileName,
	isInferStacksEnabled,
	templateHtmlDirectoryPath,
	yaml,
}) => {
	await writeFile(
		getOutputPath(),
		await substituteInHtml(await readSourceHtml()),
	);

	function getOutputPath() {
		return path.join(directoryPath, htmlFileName);
	}

	function readSourceHtml() {
		return (
			readTextFile(
				path.join(templateHtmlDirectoryPath, "index.html"),
			)
		);
	}

	function substituteInHtml(
		html,
	) {
		return (
			html
			.replace(
				"yamlLiteralPlaceholder",
				getStringLiteral(yaml),
			)
			.replace(
				"areDependenciesOfAncestorsIncludedPlaceholder",
				areDependenciesOfAncestorsIncluded,
			)
			.replace(
				"isInferStacksEnabledLiteralPlaceholder",
				isInferStacksEnabled,
			)
		);
	}
};