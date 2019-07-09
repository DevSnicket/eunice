/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const createSubsetIdentifierHierarchy = require(".");

test(
	"Items of null returns rootItemIdentifier in array.",
	() =>
		expect(
			createSubsetIdentifierHierarchy({
				items: null,
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
				items: {},
				rootItemIdentifier: null,
			}),
		)
		.toEqual(
			// the items id property wont be defined
			// eslint-disable-next-line no-undefined
			[ undefined ],
		),
);

test(
	"Item with identifier returns null.",
	() =>
		expect(
			createSubsetIdentifierHierarchy({
				items: { id: "identifier" },
				rootItemIdentifier: null,
			}),
		)
		.toBeNull(),
);