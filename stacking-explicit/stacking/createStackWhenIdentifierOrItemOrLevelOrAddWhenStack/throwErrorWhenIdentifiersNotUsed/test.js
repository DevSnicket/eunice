/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const throwErrorWhenIdentifiersNotUsed = require(".");

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