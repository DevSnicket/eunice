// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createWhenHasDependencies from "./createWhenHasDependencies";
import sumDependencyCountOfStack from "./sumDependencyCountOfStack";

export default ({
	createInnerDependencyGroupFactory,
	stack,
	stackGroupFactory,
}) =>
	createWhenHasDependencies({
		innerDependencyGroupFactory:
			createInnerDependencyGroupFactory({
				count:
					sumDependencyCountOfStack(
						stack,
					),
				keyPrefix:
					"summary",
			}),
		stackGroupFactory,
	})
	||
	stackGroupFactory;