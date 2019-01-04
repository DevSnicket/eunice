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