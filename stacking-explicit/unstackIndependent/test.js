/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const unstackIndependent = require(".");

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
				[ { dependsUpon: "childItem", id: "item1" } ],
				[ { id: "item2", items: "childItem" } ],
				[ "item3" ],
			],
			[
				[ { dependsUpon: "childItem", id: "item1" } ],
				[
					{ id: "item2", items: "childItem" },
					"item3",
				],
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