// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	getYamlFromJavascript = require("../.."),
	path = require("path"),
	readTextFile = require("../readTextFile");

test(
	"React JSX enabled and function call in content of element returns depends upon function.",
	async() => {
		const { javascript, yaml } =
			await readJavascriptAndYamlFromDirectoryPath(
				path.join(__dirname, "test-cases"),
			);

		expect(
			getYamlFromJavascript({
				babelParserPlugins: [ "jsx" ],
				javascript,
			}),
		)
		.toEqual(yaml);
	},
);

async function readJavascriptAndYamlFromDirectoryPath(
	directoryPath,
) {
	return (
		{
			javascript: await readFileWithExtension("js"),
			yaml: await readFileWithExtension("yaml"),
		}
	);

	function readFileWithExtension(
		extension,
	) {
		return readTextFile(path.join(directoryPath, `.${extension}`));
	}
}