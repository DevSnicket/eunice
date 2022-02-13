/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createSubsetIdentifierHierarchy from ".";

test(
	"identifierOrItemOrLevelOrStack of null returns rootItemIdentifier in array.",
	() =>
		expect(
			createSubsetIdentifierHierarchy({
				identifierOrItemOrLevelOrStack: null,
				rootItemIdentifier: "rootItemIdentifier",
			}),
		)
		.toEqual(
			[ "rootItemIdentifier" ],
		),
);

test(
	"Item with no identifier returns array of single undefined.",
	() =>
		expect(
			createSubsetIdentifierHierarchy({
				identifierOrItemOrLevelOrStack: {},
				rootItemIdentifier: null,
			}),
		)
		.toEqual(
			// the identifierOrItemOrLevelOrStack id property wont be defined
			// eslint-disable-next-line no-undefined
			[ undefined ],
		),
);

test(
	"Item with identifier returns null.",
	() =>
		expect(
			createSubsetIdentifierHierarchy({
				identifierOrItemOrLevelOrStack: { id: "identifier" },
				rootItemIdentifier: null,
			}),
		)
		.toBeNull(),
);