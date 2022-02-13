/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import unstackIndependent from ".";

test.each(
	[
		[
			[
				[ "item1" ],
				[ "item2" ],
			],
			[ "item1", "item2" ],
		],
		[
			[
				[ "item1" ],
				[ "item2" ],
				[ "item3" ],
			],
			[ "item1", "item2", "item3" ],
		],
		[
			[
				[ { dependsUpon: "missing", id: "item1" } ],
				[ "item2" ],
			],
			[
				{ dependsUpon: "missing", id: "item1" },
				"item2",
			],
		],
		[
			[
				[ { dependsUpon: "item2", id: "item1" } ],
				[ "item2" ],
			],
			[
				[ { dependsUpon: "item2", id: "item1" } ],
				[ "item2" ],
			],
		],
		[
			[
				[ {
					dependsUpon: { id: "item2", items: "missing" },
					id: "item1",
				} ],
				[ "item2" ],
			],
			[
				[ {
					dependsUpon: { id: "item2", items: "missing" },
					id: "item1",
				} ],
				[ "item2" ],
			],
		],
		[
			[
				[ { dependsUpon: "item2", id: "item1" } ],
				[ "item2" ],
				[ "item3" ],
			],
			[
				[ { dependsUpon: "item2", id: "item1" } ],
				[ "item2", "item3" ],
			],
		],
		[
			[
				[ "item1" ],
				[ { dependsUpon: "item1", id: "item2" } ],
				[ "item3" ],
			],
			[
				[ "item1" ],
				[
					{ dependsUpon: "item1", id: "item2" },
					"item3",
				],
			],
		],
		[
			[
				[ { id: "item1", items: { dependsUpon: "item2" } } ],
				[ "item2" ],
				[ "item3" ],
			],
			[
				[ { id: "item1", items: { dependsUpon: "item2" } } ],
				[ "item2", "item3" ],
			],
		],
		[
			[
				[ { dependsUpon: [ "item2", "item3" ], id: "item1" } ],
				[ "item2" ],
				[ "item3" ],
			],
			[
				[ { dependsUpon: [ "item2", "item3" ], id: "item1" } ],
				[ "item2", "item3" ],
			],
		],
		[
			[
				[ { dependsUpon: "item3", id: "item1" } ],
				[ { dependsUpon: "item3", id: "item2" } ],
				[ "item3" ],
			],
			[
				[
					{ dependsUpon: "item3", id: "item1" },
					{ dependsUpon: "item3", id: "item2" },
				],
				[ "item3" ],
			],
		],
		[
			[
				[ { dependsUpon: "item3", id: "item1" } ],
				[ "item2" ],
				[ "item3" ],
			],
			[
				[
					{ dependsUpon: "item3", id: "item1" },
					"item2",
				],
				[ "item3" ],
			],
		],
		[
			{
				id:
					"item",
				items:
					[
						[ { dependsUpon: "childItem2", id: "childItem1" } ],
						[ "childItem2" ],
						[ "childItem3" ],
					],
			},
			{
				id:
					"item",
				items:
					[
						[ { dependsUpon: "childItem2", id: "childItem1" } ],
						[ "childItem2", "childItem3" ],
					],
			},
		],
	],
)(
	"%j returns %j",
	(items, expected) =>
		expect(unstackIndependent(items))
		.toEqual(expected),
);