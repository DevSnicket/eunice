/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	getIdentifiersInNewStackForAncestorsAndDirectory = require("."),
	path = require("path");

test.each(
	[
		[
			[],
			null,
			[ "upperItem1", "lowerItem1" ],
		],
		[
			[ { id: "parent" } ],
			[ "parent" ],
			[ "upperItem1", "lowerItem1" ],
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
			[ "upperItem2", "lowerItem2" ],
		],
		[
			[
				{ id: "parent" },
				{ id: "directoryWithStack" },
			],
			[ "parent" ],
			[ "upperItem2", "lowerItem2" ],
		],
		[
			[
				{ },
				{ id: "directoryWithStack" },
			],
			[ null ],
			[ "upperItem2", "lowerItem2" ],
		],
		[
			[
				{ id: "directoryWithSubdirectoryWithStack" },
				{ id: "subdirectoryWithStack" },
			],
			null,
			[ "upperItem3", "lowerItem3" ],
		],
	],
)(
	"%j ancestors with subset identifier hierarchy %j returns %j",
	(ancestors, subsetIdentifierHierarchy, expected) =>
		expect(
			getIdentifiersInNewStackForAncestorsAndDirectory({
				ancestors,
				directory: path.join(__dirname, "testCases"),
				subsetIdentifierHierarchy,
			}),
		)
		.toEqual(
			expected,
		),
);