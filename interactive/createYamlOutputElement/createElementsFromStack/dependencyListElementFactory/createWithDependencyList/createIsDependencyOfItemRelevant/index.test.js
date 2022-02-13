/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import {
	addDirectionAndMutualStackToDependenciesInStack,
	createStackFromYaml,
} from "../../../../../../dependency-and-structure";

import createIsDependencyOfItemRelevant from ".";

test(
	"dependency of empty item returns false",
	() =>
		expect(
			createIsDependencyOfItemRelevant({
				areAncestorsIncluded: false,
				levelDirection: null,
			})({
				dependency: { item: {} },
				item: null,
			}),
		)
		.toBe(false),
);

test(
	"dependency in stack of item's child items returns false",
	() => {
		const item = createStackOfItem({ items: {} })[0][0];

		expect(
			createIsDependencyOfItemRelevant({
				areAncestorsIncluded: false,
				levelDirection: null,
			})({
				dependency: { item: { level: { stack: item.items } } },
				item,
			}),
		)
		.toBe(false);
	},
);

describe(
	"dependency in parent/same stack",
	() => {
		const levelDirection = {};

		test.each(
			[
				[ "different", {}, false ],
				[ "same", levelDirection, true ],
			],
		)(
			"with %s level direction returns false",
			(
				description,
				dependencyLevelDirection,
				expected,
			) => {
				const stack = createStackOfItem({ items: {} });

				expect(
					createIsDependencyOfItemRelevant({
						areAncestorsIncluded: false,
						levelDirection,
					})({
						dependency:
							{
								direction: dependencyLevelDirection,
								mutualStack: stack,
							},
						item:
							stack[0][0],
					}),
				)
				.toBe(expected);
			},
		);
	},
);

describe(
	"dependency in ancestor stack with same level direction",
	() => {
		test.each(
			[ true, false ],
		)(
			"returns are ancestors included (%s)",
			areAncestorsIncluded => {
				const
					levelDirection = {},
					stack = createStackOfItem({ items: { items: {} } });

				expect(
					createIsDependencyOfItemRelevant({
						areAncestorsIncluded,
						levelDirection,
					})({
						dependency:
							{
								direction: levelDirection,
								mutualStack: stack,
							},
						item:
							stack[0][0].items[0][0],
					}),
				)
				.toBe(areAncestorsIncluded);
			},
		);
	},
);

function createStackOfItem(
	item,
) {
	const stack = createStackFromYaml(item);

	addDirectionAndMutualStackToDependenciesInStack(stack);

	return stack;
}