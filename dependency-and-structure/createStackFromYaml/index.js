/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

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