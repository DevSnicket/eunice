/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const createOrAddToStacksOfParentMatch = require(".");

test(
	"stack grandchild items",
	() =>
		expect(
			createOrAddToStacksOfParentMatch({
				items:
					{
						id:
							"grandparent",
						items:
							{
								id: "parent",
								items: [ "child 1", "child 2" ],
							},
					},
				keysAndPatterns:
					[ {
						key: "id",
						pattern: "^parent",
					} ],
				targetLevelOrStack:
					[
						[ "child 1" ],
						[ "child 2" ],
					],
			}),
		)
		.toEqual(
			{
				id:
					"grandparent",
				items:
					{
						id:
							"parent",
						items:
							[
								[ "child 1" ],
								[ "child 2" ],
							],
					},
			},
		),
);