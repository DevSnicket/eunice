// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

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