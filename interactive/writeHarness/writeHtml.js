const
	{ writeFile } = require("fs-extra"),
	getSourcePath = require("./getSourcePath"),
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
					`\`${await readReplacement()}\``,
				)
			);
		}

		async function readReplacement() {
			return (
				(await readTextFile(yamlFilePath))
				.replace("`", "\\`")
			);
		}
	};