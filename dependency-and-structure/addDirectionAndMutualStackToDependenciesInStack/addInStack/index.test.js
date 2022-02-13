/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import addInStack from ".";

test(
	"empty item is unmodified",
	() => {
		const stack = [ [ {} ] ];

		addInStack({
			findDirectionBetweenItemsInMutualStack: null,
			stack,
		});

		expect(stack)
		.toEqual([ [ {} ] ]);
	},
);

test(
	"item with dependent is modified with findDirectionBetweenItemsInMutualStack",
	() => {
		const dependentItem = {};

		const dependent = { item: dependentItem };

		const item = { dependents: [ dependent ] };

		const stack = [ [ item ] ];

		const
			direction = {},
			findDirectionBetweenItemsInMutualStackCalls = [],
			mutualStack = {};

		addInStack({
			findDirectionBetweenItemsInMutualStack,
			stack,
		});

		expect({
			dependent:
				stack[0][0].dependents[0],
			findDirectionBetweenItemsInMutualStackCalls,
		})
		.toEqual({
			dependent:
				{
					direction,
					item:
						dependentItem,
					mutualStack,
				},
			findDirectionBetweenItemsInMutualStackCalls:
				[ {
					from: item,
					to: dependentItem,
				} ],
		});

		function findDirectionBetweenItemsInMutualStack(
			parameters,
		) {
			findDirectionBetweenItemsInMutualStackCalls.push(parameters);

			return { direction, mutualStack };
		}
	},
);

test(
	"item with missing dependUpon is unmodified",
	() => {
		const item = { dependsUpon: [ {} ] };

		const stack = [ [ item ] ];

		addInStack({
			findDirectionBetweenItemsInMutualStack:
				null,
			stack,
		});

		expect(stack[0][0].dependsUpon[0])
		.toEqual({});
	},
);

test(
	"item with found dependUpon is modified with findDirectionBetweenItemsInMutualStack",
	() => {
		const dependUponItem = {};

		const dependUpon = { itemOrFirstAncestorItem: dependUponItem };

		const item = { dependsUpon: [ dependUpon ] };

		const stack = [ [ item ] ];

		const
			direction = {},
			findDirectionBetweenItemsInMutualStackCalls = [],
			mutualStack = {};

		addInStack({
			findDirectionBetweenItemsInMutualStack,
			stack,
		});

		expect({
			dependUpon:
				stack[0][0].dependsUpon[0],
			findDirectionBetweenItemsInMutualStackCalls,
		})
		.toEqual({
			dependUpon:
				{
					direction,
					itemOrFirstAncestorItem:
						dependUponItem,
					mutualStack,
				},
			findDirectionBetweenItemsInMutualStackCalls:
				[ {
					from: item,
					to: dependUponItem,
				} ],
		});

		function findDirectionBetweenItemsInMutualStack(
			parameters,
		) {
			findDirectionBetweenItemsInMutualStackCalls.push(parameters);

			return { direction, mutualStack };
		}
	},
);

test(
	"empty child item is unmodified",
	() => {
		const stack =
			[ [ { items: [ [ {} ] ] } ] ];

		addInStack({
			findDirectionBetweenItemsInMutualStack: null,
			stack,
		});

		expect(stack)
		.toEqual([ [ { items: [ [ {} ] ] } ] ]);
	},
);