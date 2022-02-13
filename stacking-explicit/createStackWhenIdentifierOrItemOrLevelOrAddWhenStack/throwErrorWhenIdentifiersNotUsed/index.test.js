/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

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
			// @ts-ignore
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