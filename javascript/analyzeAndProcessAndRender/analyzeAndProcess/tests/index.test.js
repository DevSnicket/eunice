/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import analyzeAndProcess from "..";
import { ensureDir } from "fs-extra";
import path from "path";

test(
	"Source of empty directory returns empty array.",
	async() => {
		const directory = getSourcePath("empty");

		await ensureDir(directory);

		expect(
			await analyzeAndProcess(
				{ sources: [ { directory } ] },
			),
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