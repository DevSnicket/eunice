// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

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