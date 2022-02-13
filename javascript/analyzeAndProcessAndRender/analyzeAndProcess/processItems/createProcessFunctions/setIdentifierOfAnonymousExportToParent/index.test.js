/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import setIdentifierOfAnonymousToParent from ".";

test.each(
	[
		[
			{
				id: "parent",
				items: {},
			},
			{
				id: "parent",
				items: {},
			},
		],
		[
			{ type: "export" },
			{ type: "export" },
		],
		[
			{ items: { type: "export" } },
			{ items: { type: "export" } },
		],
		[
			{
				id: "parent",
				items: { type: "export" },
			},
			{
				id:
					"parent",
				items:
					{
						id: "parent",
						type: "export",
					},
			},
		],
		[
			{
				aParentProperty:
					"aParentValue",
				id:
					"parent",
				items:
					{
						aChildProperty: "aChildValue",
						type: "export",
					},
			},
			{
				aParentProperty:
					"aParentValue",
				id:
					"parent",
				items:
					{
						aChildProperty: "aChildValue",
						id: "parent",
						type: "export",
					},
			},
		],
		[
			{
				id:
					"grandparent",
				items:
					{
						items: { type: "export" },
						type: "export",
					},
			},
			{
				id:
					"grandparent",
				items:
					{
						id:
							"grandparent",
						items:
							{
								id: "grandparent",
								type: "export",
							},
						type:
							"export",
					},
			},
		],
		[
			{
				id:
					"grandparent",
				items:
					{
						id: "parent",
						items: { type: "export" },
					},
			},
			{
				id:
					"grandparent",
				items:
					{
						id:
							"parent",
						items:
							{
								id: "parent",
								type: "export",
							},
					},
			},
		],
	],
)(
	"%j returns %j",
	(
		identifierOrItemOrLevelOrStack,
		expected,
	) =>
		expect(
			setIdentifierOfAnonymousToParent(
				identifierOrItemOrLevelOrStack,
			),
		)
		.toEqual(expected),
);