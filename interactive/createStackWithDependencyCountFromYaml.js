// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import countDependenciesInStack from "@devsnicket/eunice-dependency-counter";
import { createStackFromYaml } from "@devsnicket/eunice-dependency-and-structure";
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

	countDependenciesInStack(stack);

	return stack;
};