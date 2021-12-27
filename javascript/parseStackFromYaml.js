// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import {
	addDirectionAndMutualStackToDependenciesInStack,
	createStackFromYaml,
} from "@devsnicket/eunice-dependency-and-structure";

import { countOfItem as countDependenciesOfItem } from "@devsnicket/eunice-dependency-counter";
import { safeLoad as parseYaml } from "js-yaml";

export default
yaml => {
	const stack =
		createStackFromYaml(
			// @ts-ignore
			parseYaml(
				yaml,
			),
		);

	addDirectionAndMutualStackToDependenciesInStack(stack);

	for (const level of stack)
		for (const item of level)
			// @ts-ignore
			item.dependencyCount = countDependenciesOfItem(item);

	return stack;
};