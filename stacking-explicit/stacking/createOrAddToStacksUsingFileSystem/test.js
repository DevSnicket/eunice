/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createOrAddToStacksUsingFileSystem = require("."),
	path = require("path");

test(
	"stack child items",
	() =>
		expect(
			createOrAddToStacksUsingFileSystem({
				directory:
					path.join(
						__dirname,
						"getIdentifiersInNewStackForAncestorsAndDirectory",
						"testCases",
					),
				items:
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
					items: [ "upperItem1", "lowerItem1" ],
				},
				{ id: "directoryWithStack" },
			],
		),
);