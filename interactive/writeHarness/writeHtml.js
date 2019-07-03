/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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