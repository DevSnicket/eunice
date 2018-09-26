const
	createStackStructureFromYaml = require("./createStackStructureFromYaml"),
	initializeDependenciesInStack = require("./initializeDependenciesInStack");

module.exports =
	yaml => {
		const stack = createStackStructureFromYaml(yaml);

		initializeDependenciesInStack(stack);

		return stack;
	};