/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createStackWhenIdentifierOrItemOrLevelOrAddWhenStack from ".";

test(
	"Null and target of existing returns null.",
	() =>
		expect(
			createStackWhenIdentifierOrItemOrLevelOrAddWhenStack({
				identifierOrItemOrLevelOrStack: null,
				targetLevelOrStack: [ "existing" ],
			}),
		)
		.toBeNull(),
);

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
	"Identifier not in target and existing in target returns identifier.",
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