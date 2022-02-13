/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import writeNameAndVersion from ".";

test.each(
	[
		[
			false,
			"without",
			"eunice",
		],
		[
			true,
			"with",
			// cSpell:disable-next-line
			"\x1b[31me\x1b[39m\x1b[32muni\x1b[39m\x1b[31mce\x1b[39m",
		],
	],
)(
	"Is color supported %s logs %s escape characters.",
	async(isColorSupported, withOrWithoutEscapeCharacters, name) => {
		const
			log = jest.fn(),
			version = "version";

		await writeNameAndVersion({
			isColorSupported,
			log,
			version,
		});

		expect(
			log.mock.calls,
		)
		.toEqual(
			[
				[],
				[ `${name} for JavaScript version` ],
				[],
			],
		);
	},
);