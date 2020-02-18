// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

import throwErrorWhenIdentifiersNotUsed from ".";

test(
	"Two identifiers not used and empty target, throws error message of the two identifiers comma separated and empty stack.",
	() =>
		expect(
			() =>
				throwErrorWhenIdentifiersNotUsed({
					identifiersNotUsed: [ "leftNotInTarget", "rightNotInTarget" ],
					targetLevelOrStack: [],
				}),
		)
		.toThrowError(
			"Neither the following items were specified \"leftNotInTarget\", \"rightNotInTarget\", nor was a single item level of \"existing\", in new the stack [].",
		),
);

describe(
	"Single identifier not used",
	() => {
		test.each(
			[
				[
					[ "newInTarget" ],
					"[ \"newInTarget\" ]",
				],
				[
					[ "leftNewInTarget", "rightNewInTarget" ],
					"[ \"leftNewInTarget\", \"rightNewInTarget\" ]",
				],
				[
					[ "upperNewInTarget", [ "lowerNewInTarget" ] ],
					"[ \"upperNewInTarget\", [ \"lowerNewInTarget\" ] ]",
				],
				[
					[ [ "upperNewInTarget" ], [ "lowerNewInTarget" ] ],
					"[ [ \"upperNewInTarget\" ], [ \"lowerNewInTarget\" ] ]",
				],
				[
					[
						[ "upperLeftNewInTarget", "upperRightNewInTarget" ],
						[ "lowerLeftNewInTarget", "lowerRightNewInTarget" ],
					],
					"[ [ \"upperLeftNewInTarget\", \"upperRightNewInTarget\" ], [ \"lowerLeftNewInTarget\", \"lowerRightNewInTarget\" ] ]",
				],
				[
					[ { id: "newInTarget" } ],
					"[ { id: \"newInTarget\" } ]",
				],
				[
					[ {
						id: "newParentInTarget",
						items: "newChildInTarget",
					} ],
					"[ { id: \"newParentInTarget\", items: \"newChildInTarget\" } ]",
				],
				[
					[ {
						id:
							"newParentInTarget",
						items:
							[
								[ "upperLeftNewInTarget", "upperRightNewInTarget" ],
								[ "lowerLeftNewInTarget", "lowerRightNewInTarget" ],
							],
					} ],
					"[ { id: \"newParentInTarget\", items: [ [ \"upperLeftNewInTarget\", \"upperRightNewInTarget\" ], [ \"lowerLeftNewInTarget\", \"lowerRightNewInTarget\" ] ] } ]",
				],
			],
		)(
			"Target of %j, throws error message of %s.",
			(targetLevelOrStack, targetDescription) =>
				expect(
					() =>
						throwErrorWhenIdentifiersNotUsed({
							identifiersNotUsed: [ "notInTarget" ],
							targetLevelOrStack,
						}),
				)
				.toThrowError(
					`Neither the following items were specified "notInTarget", nor was a single item level of "existing", in new the stack ${targetDescription}.`,
				),
		);
	},
);