/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import isInnerStack from ".";

test(
	"Same object returns false",
	() => {
		const same = {};

		expect(
			isInnerStack({
				source: same,
				target: same,
			}),
		)
		.toBe(false);
	},
);

test(
	"Different objects returns false",
	() =>
		expect(
			isInnerStack({
				source: {},
				target: {},
			}),
		)
		.toBe(false),
);

test(
	"From parent to child returns true",
	() => {
		const parent = {};

		const child = createStackWithParent(parent);

		expect(
			isInnerStack({
				source: parent,
				target: child,
			}),
		)
		.toBe(true);
	},
);

test(
	"From grandparent to grandchild returns true",
	() => {
		const grandparent = {};

		const grandchild =
			createStackWithParent(
				createStackWithParent(
					grandparent,
				),
			);

		expect(
			isInnerStack({
				source: grandparent,
				target: grandchild,
			}),
		)
		.toBe(true);
	},
);

function createStackWithParent(
	parent,
) {
	return { parent: { level: { stack: parent } } };
}