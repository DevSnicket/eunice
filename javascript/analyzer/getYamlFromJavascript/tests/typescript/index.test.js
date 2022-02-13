/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

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