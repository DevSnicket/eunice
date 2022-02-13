/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import hasParentInAncestors from ".";

describe(
	"Key of \"id\" and pattern of \"addToParent\"",
	() =>
		test.each(
			[
				[ [], false ],
				[ [ { } ], false ],
				[
					[ { id: "parent" } ],
					false,
				],
				[
					[ { id: "addToParent" }, { id: "ancestor" } ],
					false,
				],
				[
					[ { id: "addToParent" } ],
					true,
				],
				[
					[ { id: "ancestor" }, { id: "addToParent" } ],
					true,
				],
			],
		)(
			"Ancestors of %j returns %j",
			(ancestors, expected) =>
				expect(
					hasParentInAncestors({
						ancestors,
						keysAndPatterns:
							[ {
								key: "id",
								pattern: "addToParent",
							} ],
					}),
				)
				.toBe(
					expected,
				),
		),
);

describe(
	"Keys of \"id\" and \"type\", and patterns of \"addToParent\" and \"file\".",
	() =>
		test.each(
			[
				[
					[ { id: "addToParent" } ],
					false,
				],
				[
					[ { type: "file" } ],
					false,
				],
				[
					[ {
						id: "addToParent",
						type: "file",
					} ],
					true,
				],
			],
		)(
			"Ancestors of %j returns %j",
			// @ts-ignore
			(ancestors, expected) =>
				expect(
					hasParentInAncestors({
						ancestors,
						keysAndPatterns:
							[
								{
									key: "id",
									pattern: "addToParent",
								},
								{
									key: "type",
									pattern: "file",
								},
							],
					}),
				)
				.toBe(
					expected,
				),
		),
);