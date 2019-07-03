/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const setTypeOfRootItems = require(".");

assertSetTypeOfRootItems({
	expected: null,
	name: "null returns null",
	source: null,
});

assertSetTypeOfRootItems({
	expected: { id: "item", type: "testType" },
	name: "item identifier returns item identifier",
	source: "item",
});

assertSetTypeOfRootItems({
	expected: [ { id: "item", type: "testType" } ],
	name: "single item identifier returns single item identifier",
	source: [ "item" ],
});

assertSetTypeOfRootItems({
	expected:
		[
			{ id: "item1", type: "testType" },
			{ id: "item2", type: "testType" },
		],
	name: "two item identifier returns two item identifier",
	source: [ "item1", "item2" ],
});

assertSetTypeOfRootItems({
	expected: { id: "item", type: "testType" },
	name: "single item returns single item",
	source: { id: "item" },
});

function assertSetTypeOfRootItems({
	expected,
	name,
	source,
}) {
	test(
		name,
		() =>
			expect(
				setTypeOfRootItems({
					items: source,
					type: "testType",
				}),
			)
			.toEqual(expected),
	);
}