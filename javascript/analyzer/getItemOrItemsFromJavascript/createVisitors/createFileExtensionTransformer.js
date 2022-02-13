/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import fileSystem from "fs";
import path from "path";

export default
extensions => {
	return (
		whenHasExtensions()
		||
		withNoExtensions()
	);

	function whenHasExtensions() {
		return (
			extensions
			&&
			{
				getRelativeWhenFileExists,
				removeExtensionFromFilePath,
			}
		);

		function getRelativeWhenFileExists({
			absolute,
			relative,
		}) {
			return (
				existsWithoutAddingExtension()
				||
				existsWithExtensionAdded()
			);

			function existsWithoutAddingExtension() {
				return (
					filePathExists({
						absolute,
						relative,
					})
					&&
					{
						withExtension: relative,
						withoutExtension: removeExtensionFromFilePath(relative),
					}
				);
			}

			function existsWithExtensionAdded() {
				return (
					extensions
					.flatMap(
						extension =>
							[
								{
									withExtension: path.join(relative, `index${extension}`),
									withoutExtension: `${relative}/index`,
								},
								{
									withExtension: `${relative}${extension}`,
									withoutExtension: relative,
								},
							],
					)
					.find(
						({ withExtension }) =>
							filePathExists({
								absolute,
								relative: withExtension,
							}),
					)
				);
			}
		}

		function removeExtensionFromFilePath(
			filePath,
		) {
			return (
				removeExtension(getExtension())
				||
				filePath
			);

			function getExtension() {
				return (
					filePath
					&&
					extensions.find(extension => filePath.endsWith(extension))
				);
			}

			function removeExtension(
				extension,
			) {
				return (
					extension
					&&
					filePath.substring(
						0,
						filePath.length - extension.length,
					)
				);
			}
		}
	}

	function withNoExtensions() {
		return (
			{
				getRelativeWhenFileExists,
				removeExtensionFromFilePath:
					filePath => filePath,
			}
		);

		function getRelativeWhenFileExists(
			filePath,
		) {
			return (
				filePathExists(filePath)
				&&
				{
					withExtension: filePath.relative,
					withoutExtension: filePath.relative,
				}
			);
		}
	}

	function filePathExists({
		absolute,
		relative,
	}) {
		const resolvedPath = path.join(absolute, relative);

		return (
			fileSystem.existsSync(resolvedPath)
			&&
			!fileSystem.lstatSync(resolvedPath)
			.isDirectory()
		);
	}
};