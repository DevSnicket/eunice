// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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