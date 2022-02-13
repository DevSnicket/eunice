/* Eunice
Copyright (c) 2018 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import escapeStringLiteral from "./escapeStringLiteral";
import fs from "fs";
import getStringLiteral from "../../getStringLiteral";
import path from "path";
import { promisify } from "util";

const
	deleteFile = promisify(fs.unlink),
	fileExists = promisify(fs.exists),
	readFile = promisify(fs.readFile),
	writeFile = promisify(fs.writeFile);

export default ({
	directory,
	javascriptSubstitutions,
	title,
}) => {
	return { apply };

	function apply(
		compiler,
	) {
		compiler.hooks.done.tapPromise(
			"Create Transform JavaScript To Html In Directory Plugin",
			transform,
		);
	}

	async function transform(
		{ compilation: { errors } },
	) {
		const javascriptPath = path.join(directory, "harness.js");

		if (await fileExists(javascriptPath)) {
			await writeHtml(
				formatHtml({
					favicon:
						await readFavicon(),
					javascript:
						await getJavascriptSubstituted(
							await readJavascript(),
						),
				}),
			);

			await deleteFile(javascriptPath);
		} else
			errors.push(`JavaScript file "${javascriptPath}" not found to transform into a HTML file.`);

		function readFavicon() {
			return (
				readFile(
					path.join(__dirname, "..", "..", "favicon.ico"),
					"base64",
				)
			);
		}

		function readJavascript() {
			return readTextFile(javascriptPath);
		}

		function getJavascriptSubstituted(
			javascript,
		) {
			return (
				javascriptSubstitutions.reduce(
					getJavascriptWithSubstitution,
					javascript,
				)
			);
		}

		function formatHtml({
			favicon,
			javascript,
		}) {
			return `<!DOCTYPE html>
<html>
	<head>
		<link href="data:image/x-icon;base64,${favicon}" rel="icon" type="image/x-icon" />
		<meta charset="UTF-8">
		<title>Eunice ${title}</title>
	</head>
	<body>
		<div id="container"></div>
		<script type="text/javascript">${javascript}</script>
	</body>
</html>`;
		}

		function writeHtml(html) {
			return writeFile(getFilePath(), html);

			function getFilePath() {
				return path.join(directory, "index.html");
			}
		}
	}
};

async function getJavascriptWithSubstitution(
	javascript,
	substitution,
) {
	return (
		(await javascript).replace(
			substitution.pattern,
			await readOrGetReplacement(),
		)
	);

	async function readOrGetReplacement() {
		return (
			await readReplacementFileWhenHasPath()
			||
			substitution.replacement
		);
	}

	async function readReplacementFileWhenHasPath() {
		return (
			substitution.replacementFilePath
			&&
			escapeStringLiteralWhenSpecified(
				getStringLiteral(
					await readTextFile(
						substitution.replacementFilePath,
					),
				),
			)
		);
	}

	function escapeStringLiteralWhenSpecified(
		stringLiteral,
	) {
		return (
			substitution.escape
			?
			escapeStringLiteral(stringLiteral)
			:
			stringLiteral
		);
	}
}

function readTextFile(
	filePath,
) {
	return readFile(filePath, "utf-8");
}