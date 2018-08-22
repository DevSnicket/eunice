const
	createStackStructureFromYaml = require("./createStackFromYaml/createStackStructureFromYaml"),
	initializeDependenciesInStack = require("./createStackFromYaml/initializeDependenciesInStack");

module.exports =
	yaml => {
		const stack = createStackStructureFromYaml(yaml);

		initializeDependenciesInStack(stack);

		return stack;
	};