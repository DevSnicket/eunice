/* istanbul ignore file: test would be a mirror of implementation */

const
	createStackFromYaml = require("./createStackFromYaml"),
	createYamlFromStack = require("./createYamlFromStack");

module.exports =
	{
		createStackFromYaml,
		createYamlFromStack,
	};