/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	escapeStringLiteral = require("./escapeStringLiteral"),
	fs = require("fs"),
	getStringLiteral = require("../../getStringLiteral"),
	path = require("path"),
	{ promisify } = require("util");

const
	deleteFile = promisify(fs.unlink),
	fileExists = promisify(fs.exists),
	readFile = promisify(fs.readFile),
	writeFile = promisify(fs.writeFile);

module.exports =
	({
		directory,
		javascriptSubstitution,
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

			async function getJavascriptSubstituted(
				javascript,
			) {
				return (
					javascriptSubstitution
					?
					javascript.replace(
						javascriptSubstitution.pattern,
						await readReplacement(),
					)
					:
					javascript
				);

				async function readReplacement() {
					return (
						escapeStringLiteralWhenSpecified(
							getStringLiteral(
								await readTextFile(
									javascriptSubstitution.replacementFilePath,
								),
							),
						)
					);
				}

				function escapeStringLiteralWhenSpecified(
					stringLiteral,
				) {
					return (
						javascriptSubstitution.escape
						?
						escapeStringLiteral(stringLiteral)
						:
						stringLiteral
					);
				}
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
		<title>DevSnicket Eunice Test Harness</title>
	</head>
	<body>
		<div id="container"></div>
		<script type="text/javascript">${javascript}</script>
	</body>
</html>`;
			}

			function readTextFile(
				filePath,
			) {
				return readFile(filePath, "utf-8");
			}

			function writeHtml(html) {
				return writeFile(getFilePath(), html);

				function getFilePath() {
					return path.join(directory, "index.html");
				}
			}
		}
	};