// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import getYamlFromJavascript from "../..";
import path from "path";
import readTextFile from "../readTextFile";

test(
	"Typescript enabled and function declaration, call of parameter and variable with type annotations.",
	async() => {
		const { javascript, yaml } =
			await readJavascriptAndYamlFromDirectoryPath(
				path.join(__dirname, "test-case"),
			);

		expect(
			getYamlFromJavascript({
				babelParserPlugins: [ "typescript" ],
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
			javascript: await readFileWithExtension("ts"),
			yaml: await readFileWithExtension("yaml"),
		}
	);

	function readFileWithExtension(
		extension,
	) {
		return readTextFile(path.join(directoryPath, `.${extension}`));
	}
}