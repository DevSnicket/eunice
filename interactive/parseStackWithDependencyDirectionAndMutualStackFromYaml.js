// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { addDirectionAndMutualStackToDependenciesInStack } from "@devsnicket/eunice-dependency-and-structure";
import parseStackFromYaml from "./parseStackFromYaml";

export default
yaml => {
	const stack = parseStackFromYaml(yaml);

	addDirectionAndMutualStackToDependenciesInStack(stack);

	return stack;
};