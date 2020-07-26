// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

// istanbul ignore file: test would be a mirror of implementation

import createStackStructureFromYaml from "./createStackStructureFromYaml";
import initializeDependenciesInStack from "./initializeDependenciesInStack";
import initializeParentReferencesInStack from "../initializeParentReferencesInStack";

export default
/**
  * @param {import("../Yaml.d")} yaml
  * @return {import("../Stack.d")}
  */
yaml => {
	const stack = createStackStructureFromYaml(yaml);

	initializeParentReferencesInStack(stack);
	initializeDependenciesInStack(stack);

	return stack;
};