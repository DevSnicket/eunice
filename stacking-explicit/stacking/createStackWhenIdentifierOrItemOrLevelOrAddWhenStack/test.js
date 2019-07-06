/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const createStackWhenIdentifierOrItemOrLevelOrAddWhenStack = require(".");

test(
	"Identifier in target returns identifier.",
	() =>
		expect(
			createStackWhenIdentifierOrItemOrLevelOrAddWhenStack({
				identifierOrItemOrLevelOrStack: "item",
				targetLevelOrStack: [ "item" ],
			}),
		)
		.toEqual(
			"item",
		),
);

test(
	"Identifier not in target, with existing in target, returns identifier.",
	() =>
		expect(
			createStackWhenIdentifierOrItemOrLevelOrAddWhenStack({
				identifierOrItemOrLevelOrStack: "item",
				targetLevelOrStack: [ "existing" ],
			}),
		)
		.toEqual(
			"item",
		),
);

test(
	"Identifier not in target throws error.",
	() =>
		expect(
			() =>
				createStackWhenIdentifierOrItemOrLevelOrAddWhenStack({
					identifierOrItemOrLevelOrStack: "item",
					targetLevelOrStack: [],
				}),
		)
		.toThrowError(
			"Neither the following items were specified \"item\", nor was a single item level of \"existing\", in new the stack [].",
		),
);