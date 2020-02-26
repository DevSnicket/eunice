// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import getYamlFromJavascript from "../..";
import path from "path";
import readTextFile from "../readTextFile";

test(
	"React JSX enabled and function call in content of element returns depends upon function.",
	async() => {
		const { javascript, yaml } =
			await readJavascriptAndYamlFromDirectoryPath(
				path.join(__dirname, "test-case"),
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