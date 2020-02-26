// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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