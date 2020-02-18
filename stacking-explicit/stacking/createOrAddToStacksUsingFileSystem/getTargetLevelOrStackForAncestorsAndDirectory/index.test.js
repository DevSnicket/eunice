// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

import getTargetLevelOrStackForAncestorsAndDirectory from ".";
import path from "path";

test.each(
	[
		[
			[],
			null,
			[ [ "upperItem1" ], [ "lowerItem1" ] ],
		],
		[
			[ { id: "parent" } ],
			[ "parent" ],
			[ [ "upperItem1" ], [ "lowerItem1" ] ],
		],
		[
			[],
			[ "parent" ],
			false,
		],
		[
			[ { id: "directoryWithoutStack" } ],
			null,
			false,
		],
		[
			[ { id: "directoryWithStack" } ],
			null,
			[ [ "directoryWithStackUpper" ], [ "directoryWithStackLower" ] ],
		],
		[
			[
				{ id: "parent" },
				{ id: "directoryWithStack" },
			],
			[ "parent" ],
			[ [ "directoryWithStackUpper" ], [ "directoryWithStackLower" ] ],
		],
		[
			[
				{ },
				{ id: "directoryWithStack" },
			],
			[ null ],
			[ [ "directoryWithStackUpper" ], [ "directoryWithStackLower" ] ],
		],
		[
			[
				{ },
				{ id: "directoryWithStackOfLowerAnonymous" },
			],
			[ null ],
			[ [ "directoryWithStackOfLowerAnonymousUpper" ], [ {} ] ],
		],
		[
			[
				{ },
				{ id: "directoryWithStackOfLowerAnonymousWithProperty" },
			],
			[ null ],
			[ [ "directoryWithStackOfLowerAnonymousWithPropertyUpper" ], [ { property: "value" } ] ],
		],
		[
			[
				{ },
				{ id: "directoryWithStackOfLowerNull" },
			],
			[ null ],
			[ [ "directoryWithStackOfLowerNullUpper" ], [ null ] ],
		],
		[
			[
				{ id: "directoryWithSubdirectoryWithStack" },
				{ id: "subdirectoryWithStack" },
			],
			null,
			[ [ "directoryWithSubdirectoryWithStackUpper" ], [ "directoryWithSubdirectoryWithStackLower" ] ],
		],
	],
)(
	"%j ancestors with subset identifier hierarchy %j returns %j",
	(ancestors, subsetIdentifierHierarchy, expected) =>
		expect(
			getTargetLevelOrStackForAncestorsAndDirectory({
				ancestors,
				directory:
					path.join(__dirname, "testCases"),
				subsetIdentifierHierarchy,
			}),
		)
		.toEqual(
			expected,
		),
);