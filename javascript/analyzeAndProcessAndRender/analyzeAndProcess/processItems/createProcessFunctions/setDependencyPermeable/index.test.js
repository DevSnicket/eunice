/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import setDependencyPermeable from ".";

test.each(
	[
		[
			{ identifierOrItemOrLevelOrStack: null },
			null,
		],
		[
			{
				dependencyPermeableIdentifiers: [],
				identifierOrItemOrLevelOrStack: null,
			},
			null,
		],
		[
			{
				dependencyPermeableIdentifiers: [ ],
				identifierOrItemOrLevelOrStack: "identifier",
			},
			"identifier",
		],
		[
			{
				dependencyPermeableIdentifiers: [ "identifier" ],
				identifierOrItemOrLevelOrStack: "identifier",
			},
			{
				dependencyPermeable: true,
				id: "identifier",
			},
		],
		[
			{
				dependencyPermeableIdentifiers: [ "identifier" ],
				identifierOrItemOrLevelOrStack: { id: "identifier" },
			},
			{
				dependencyPermeable: true,
				id: "identifier",
			},
		],
	],
)(
	"%j returns %j",
	(
		{
			// @ts-ignore
			dependencyPermeableIdentifiers,
			identifierOrItemOrLevelOrStack,
		},
		expected,
	) =>
		expect(
			setDependencyPermeable({
				dependencyPermeableIdentifiers,
				identifierOrItemOrLevelOrStack,
			}),
		)
		.toEqual(expected),
);