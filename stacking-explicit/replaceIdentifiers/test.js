/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const replaceIdentifiers = require(".");

test.each(
	[
		[
			{ items: null },
			null,
		],
		[
			{ items: "item" },
			"item",
		],
		[
			{
				items: "Item",
				pattern: "",
				replacement: "replacement",
			},
			"replacementItem",
		],
		[
			{
				items: "item",
				pattern: /.*/,
				replacement: "",
			},
			"",
		],
		[
			{
				items: { anotherProperty: "anotherValue", id: "item" },
				pattern: /.*/,
				replacement: "",
			},
			{ anotherProperty: "anotherValue" },
		],
		[
			{
				items: { otherIdentifier: "item" },
				pattern: /.+/,
				replacement: "replacement",
			},
			{ otherIdentifier: "item" },
		],
		[
			{
				items: { otherIdentifier: "item" },
				pattern: "",
				replacement: "replacement",
			},
			{
				id: "replacement",
				otherIdentifier: "item",
			},
		],
		[
			{
				items: "item",
				pattern: /$/,
				replacement: "Replacement",
			},
			"itemReplacement",
		],
		[
			{
				items: { items: "Item" },
				pattern: "",
				replacement: "replacement",
			},
			{ id: "replacement", items: "replacementItem" },
		],
		[
			{
				items: { id: "parent", items: "child" },
				pattern: "parent",
				replacement: "replacement",
			},
			{ id: "replacement", items: "child" },
		],
		[
			{
				items: { id: "parent", items: "child" },
				pattern: "child",
				replacement: "replacement",
			},
			{ id: "parent", items: "replacement" },
		],
		[
			{
				items: { id: "parent", items: "child" },
				pattern: "child",
				replacement: "replacement",
				rootOnly: true,
			},
			{ id: "parent", items: "child" },
		],
	],
)(
	"%j returns %j",
	(
		{ items, pattern, replacement, rootOnly },
		expected,
	) =>
		expect(
			replaceIdentifiers({
				items,
				pattern,
				replacement,
				rootOnly,
			}),
		)
		.toEqual(expected),
);