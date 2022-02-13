/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createOrAddToStacksUsingFileSystem from ".";
import path from "path";

const testCasesDirectory =
	path.join(
		__dirname,
		"test-cases",
	);

test(
	"stack child items of subset",
	() =>
		expect(
			createOrAddToStacksUsingFileSystem({
				directory:
					path.join(
						testCasesDirectory,
						"directoryWithStack",
					),
				identifierOrItemOrLevelOrStack:
					[
						{ id: "parent" },
						{ id: "directoryWithStack" },
					],
				subsetIdentifierHierarchy:
					[ "parent" ],
			}),
		)
		.toEqual(
			[
				{
					id: "parent",
					items: [ [ "upperItem1" ], [ "lowerItem1" ] ],
				},
				{ id: "directoryWithStack" },
			],
		),
);

test(
	"stack in subdirectory moved into child items of parent stack item",
	() =>
		expect(
			createOrAddToStacksUsingFileSystem({
				directory:
					path.join(
						testCasesDirectory,
						"directoryWithStackOfSubdirectoryWithStackMovedIntoChildren",
					),
				identifierOrItemOrLevelOrStack:
					{
						id:
							"subdirectoryWithStack",
						items:
							[
								"subdirectoryWithStackLower",
								"subdirectoryWithStackUpper",
							],
					},
			}),
		)
		.toEqual({
			id:
				"new item",
			items:
				{
					id:
						"subdirectoryWithStack",
					items:
						[
							[ "subdirectoryWithStackUpper" ],
							[ "subdirectoryWithStackLower" ],
						],
				},
		}),
);