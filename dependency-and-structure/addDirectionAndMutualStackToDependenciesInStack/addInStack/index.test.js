// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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