const
	{ lstat, readdir } = require("fs-extra"),
	path = require("path");

module.exports = readDirectoryPathRecursive;

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