const
	{ writeFile } = require("fs-extra"),
	getSourcePath = require("./getSourcePath"),
	getStringLiteral = require("@devsnicket/eunice-test-harnesses/getStringLiteral"),
	path = require("path"),
	readTextFile = require("../readTextFile");

module.exports =
	async({
		directoryPath,
		htmlFileName,
		yamlFilePath,
	}) => {
		await writeFile(
			getOutputPath(),
			await substituteInHtml(await readSourceHtml()),
		);

		function getOutputPath() {
			return path.join(directoryPath, htmlFileName);
		}

		function readSourceHtml() {
			return readTextFile(getSourcePath("index.html"));
		}

		async function substituteInHtml(
			html,
		) {
			return (
				html.replace(
					"yamlFromWebpack",
					await readReplacement(),
				)
			);
		}

		async function readReplacement() {
			return (
				getStringLiteral(
					await readTextFile(yamlFilePath),
				)
			);
		}
	};