// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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