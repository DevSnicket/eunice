const
	createStackStructureFromParsedYaml = require("./createStackFromParsedYaml/createStackStructureFromParsedYaml"),
	initializeDependenciesInStack = require("./createStackFromParsedYaml/initializeDependenciesInStack");

module.exports =
	yaml => {
		const stack = createStackStructureFromParsedYaml(yaml);

		initializeDependenciesInStack(stack);

		return stack;
	};