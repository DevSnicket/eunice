/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import fileSystem from "fs-extra";
import getOrCreateFileItem from "./getOrCreateFileItem";
import path from "path";

export default async({
	directoryPath,
	fileExtensions,
	fileOrSubdirectoryPath,
	getItemOrItemsFromJavascript,
}) => {
	const
		{
			name: identifier,
			ext: fileOrSubdirectoryExtension,
		}
		= path.parse(fileOrSubdirectoryPath.name);

	return (
		isJavascript()
		&&
		[
			getOrCreateFileItem({
				identifier,
				itemOrItems:
					getItemOrItemsFromJavascriptOrRethrowErrorWithPath(
						await fileSystem.readFile(
							fileOrSubdirectoryPath.absolute,
							"utf-8",
						),
					),
			}),
		]
	);

	function isJavascript() {
		return (
			fileExtensions.includes(
				fileOrSubdirectoryExtension,
			)
		);
	}

	function getItemOrItemsFromJavascriptOrRethrowErrorWithPath(
		javascript,
	) {
		try {
			return getItemOrItemsFromJavascript(javascript);
		} catch (error) {
			throw new Error(`Analysis of file "${path.join(directoryPath.relative, fileOrSubdirectoryPath.name)}" raised the following error.\n\n${error.message}`);
		}
	}
};