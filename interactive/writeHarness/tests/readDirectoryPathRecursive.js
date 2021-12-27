// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { lstat, readdir } from "fs-extra";
import path from "path";

export default readDirectoryPathRecursive;

async function readDirectoryPathRecursive(
	directoryPath,
) {
	return (
		Promise.all(
			(await readdir(directoryPath))
			.map(getFileNameOrReadDirectoryRecursive),
		)
	);

	async function getFileNameOrReadDirectoryRecursive(
		name,
	) {
		const fileOrDirectoryPath = path.join(directoryPath, name);

		return (
			await isDirectory()
			?
			{ [name]: await readDirectoryPathRecursive(fileOrDirectoryPath) }
			:
			name
		);

		async function isDirectory() {
			return (
				(await lstat(fileOrDirectoryPath))
				.isDirectory()
			);
		}
	}
}