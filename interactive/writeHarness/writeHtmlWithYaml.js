// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	{ writeFile } = require("fs-extra"),
	getStringLiteral = require("@devsnicket/eunice-test-harnesses/getStringLiteral"),
	path = require("path"),
	readTextFile = require("../readTextFile");

module.exports =
	async({
		htmlFileName,
		directoryPath,
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
				html.replace(
					"yamlFromWebpack",
					getStringLiteral(yaml),
				)
			);
		}
	};