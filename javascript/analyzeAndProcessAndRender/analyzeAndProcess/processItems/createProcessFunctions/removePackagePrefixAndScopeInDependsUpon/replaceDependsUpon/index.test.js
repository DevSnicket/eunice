/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

// Undefined needed to test items without a dependsUpon property
/* eslint-disable no-undefined */

import replaceDependsUpon from ".";

test(
	"Identifier without replace callback returns identifier.",
	() => {
		const identifierOrItemOrLevelOrStack = "identifier";

		expect(
			replaceDependsUpon({
				identifierOrItemOrLevelOrStack,
				replace: null,
			}),
		)
		.toBe(
			identifierOrItemOrLevelOrStack,
		);
	},
);

test.each(
	[
		[
			{},
			null,
			undefined,
			{},
		],
		[
			{
				id: "identifier",
				otherProperty: "otherValue",
			},
			null,
			undefined,
			{
				id: "identifier",
				otherProperty: "otherValue",
			},
		],
		[
			{ dependsUpon: "original" },
			null,
			"original",
			{},
		],
		[
			{},
			"replacement",
			undefined,
			{ dependsUpon: "replacement" },
		],
		[
			{ dependsUpon: "original" },
			"replacement",
			"original",
			{ dependsUpon: "replacement" },
		],
		[
			[ { dependsUpon: "original" } ],
			"replacement",
			"original",
			[ { dependsUpon: "replacement" } ],
		],
		[
			[ [ { dependsUpon: "original" } ] ],
			"replacement",
			"original",
			[ [ { dependsUpon: "replacement" } ] ],
		],
	],
)(
	"%j and replacement of %o calls replace with argument %o and returns %j",
	// @ts-ignore
	(identifierOrItemOrLevelOrStack, replacement, replaceCallArgument, expected) => {
		const replace = jest.fn(() => replacement);

		const result =
			replaceDependsUpon({
				identifierOrItemOrLevelOrStack,
				replace,
			});

		expect({
			replaceCallArguments: replace.mock.calls,
			result,
		})
		.toEqual({
			replaceCallArguments: [ [ replaceCallArgument ] ],
			result: expected,
		});
	},
);

test(
	"Replaced in child item",
	() => {
		const replace = jest.fn(() => "replacement");

		const result =
			replaceDependsUpon({
				identifierOrItemOrLevelOrStack:
					{ items: { } },
				replace,
			});

		expect({
			replaceCallArguments: replace.mock.calls,
			result,
		})
		.toEqual({
			replaceCallArguments:
				[ [ undefined ], [ undefined ] ],
			result:
				{
					dependsUpon: "replacement",
					items: { dependsUpon: "replacement" },
				},
		});
	},
);