/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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