/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const mapAndCreateNewInTargetLevelOrStack = require(".");

test(
	"New in target with add new in target false returns null.",
	() =>
		expect(
			mapAndCreateNewInTargetLevelOrStack({
				addNewInTarget:
					false,
				getLevelOrStackForTargetIdentifierOrItem:
					() => null,
				targetLevelOrStack:
					[ "newInTarget" ],
			}),
		)
		.toBeNull(),
);

describe(
	"With add new in target true",
	() => {
		test(
			"New in target with no items returns new in target.",
			() => {
				const newInTarget = {};

				expect(
					mapAndCreateNewInTargetLevelOrStack({
						addNewInTarget:
							true,
						getLevelOrStackForTargetIdentifierOrItem:
							() => null,
						targetLevelOrStack:
							[ newInTarget ],
					}),
				)
				.toBe(
					newInTarget,
				);
			},
		);

		test(
			"New in target with child item returns new in target with child item.",
			() =>
				expect(
					mapAndCreateNewInTargetLevelOrStack({
						addNewInTarget:
							true,
						getLevelOrStackForTargetIdentifierOrItem:
							item =>
								item === "childInTarget" && "child",
						targetLevelOrStack:
							[ {
								id: "parent",
								items: "childInTarget",
							} ],
					}),
				)
				.toEqual({
					id: "parent",
					items: "child",
				}),
		);

		test(
			"New in target with child items returns new in target with child items.",
			() =>
				expect(
					mapAndCreateNewInTargetLevelOrStack({
						addNewInTarget:
							true,
						getLevelOrStackForTargetIdentifierOrItem:
							item =>
								item === "childInTarget" && "child",
						targetLevelOrStack:
							[ {
								id: "parent",
								items: [ "childInTarget" ],
							} ],
					}),
				)
				.toEqual({
					id: "parent",
					items: "child",
				}),
		);

		test(
			"New in target with grandchild items returns new in target with grandchild items.",
			() =>
				expect(
					mapAndCreateNewInTargetLevelOrStack({
						addNewInTarget:
							true,
						getLevelOrStackForTargetIdentifierOrItem:
							item =>
								item === "grandchildInTarget" && "grandchild",
						targetLevelOrStack:
							[ {
								id:
									"grandparent",
								items:
									{
										id: "parent",
										items: [ "grandchildInTarget" ],
									},
							} ],
					}),
				)
				.toEqual({
					id: "grandparent",
					items: { id: "parent", items: "grandchild" },
				}),
		);
	},
);