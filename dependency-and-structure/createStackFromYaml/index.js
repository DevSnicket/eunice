// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

// istanbul ignore file: test would be a mirror of implementation

const
	createStackStructureFromYaml = require("./createStackStructureFromYaml"),
	initializeDependenciesInStack = require("./initializeDependenciesInStack");

module.exports =
	/**
	 * @param {import("../index").Yaml} yaml
	 * @return {import("../index").Stack}
	 */
	yaml => {
		const stack = createStackStructureFromYaml(yaml);

		initializeDependenciesInStack(stack);

		return stack;
	};