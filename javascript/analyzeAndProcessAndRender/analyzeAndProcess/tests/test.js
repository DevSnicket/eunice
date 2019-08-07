/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	analyzeAndProcess = require(".."),
	{ ensureDir } = require("fs-extra"),
	path = require("path");

test(
	"Source of empty directory returns empty array.",
	async() => {
		const directory = getSourcePath("empty");

		await ensureDir(directory);

		expect(
			await analyzeAndProcess({
				directoryToCreateOrAddToStacksFrom: null,
				ignorePathPattern: null,
				packagePrefixAndScope: null,
				sources: [ { directory } ],
			}),
		)
		.toEqual(
			[],
		);
	},
);


test(
	"Two source directories with a single file each returns both source items.",
	async() =>
		expect(
			await analyzeAndProcess({
				directoryToCreateOrAddToStacksFrom:
					null,
				ignorePathPattern:
					null,
				packagePrefixAndScope:
					null,
				sources:
					[
						{ directory: getSourcePath("first") },
						{ directory: getSourcePath("second") },
					],
			}),
		)
		.toEqual(
			[
				{
					id: "fileInFirst",
					type: "file",
				},
				{
					id: "fileInSecond",
					type: "file",
				},
			],
		),
);

test(
	"Two source directories with a single file each and directory for stack returns stack of both source items.",
	async() =>
		expect(
			await analyzeAndProcess({
				directoryToCreateOrAddToStacksFrom:
					getSourcePath("upperLowerStack"),
				ignorePathPattern:
					null,
				packagePrefixAndScope:
					null,
				sources:
					[
						{ directory: getSourcePath("first") },
						{ directory: getSourcePath("second") },
					],
			}),
		)
		.toEqual(
			[
				[ {
					id: "fileInSecond",
					type: "file",
				} ],
				[ {
					id: "fileInFirst",
					type: "file",
				} ],
			],
		),
);

function getSourcePath(
	source,
) {
	return path.join(__dirname, "sources", source);
}