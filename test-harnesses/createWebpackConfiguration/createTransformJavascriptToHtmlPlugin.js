const
	fs = require("fs"),
	path = require("path"),
	{ promisify } = require("util");

const
	deleteFile = promisify(fs.unlink),
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

		async function transform() {
			const javascriptPath = path.join(directory, "harness.js");

			await writeHtml(
				getHtmlWithJavascript(
					await getJavascriptSubstituted(
						await readJavascript(),
					),
				),
			);

			await deleteFile(javascriptPath);

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
						`\`${await readReplacement()}\``,
					)
					:
					javascript
				);

				async function readReplacement() {
					return (
						(await readTextFile(javascriptSubstitution.replacementFilePath))
						.replace("`", "\\`")
					);
				}
			}

			function getHtmlWithJavascript(
				javascript,
			) {
				return `<!DOCTYPE html>
<html>
	<head><meta charset="UTF-8"><title>DevSnicket Eunice Test Harness</title></head>
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