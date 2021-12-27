// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import ensureDependencyCountsInStack from ".";

test(
	"dependencies are not recounted",
	() => {
		const dependencyCount = {};

		const stack = [ [ { dependencyCount } ] ];

		ensureDependencyCountsInStack(stack);

		expect(stack[0][0].dependencyCount)
		.toBe(dependencyCount);
	},
);