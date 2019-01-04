/* istanbul ignore file: test would be a mirror of implementation */

const
	createStackFromYaml = require("./createStackFromYaml"),
	createYamlFromStack = require("./createYamlFromStack");

module.exports =
	{
		createStackFromYaml,
		createYamlFromStack,
	};

/**
  * @typedef {Level[]} Stack
  * @property {Stack} [parent]
  *
  * @typedef {Item[]} Level
  * @property {Stack} stack
  *
  * @typedef Item
  * @property {(Item | String)[]} [dependsUpon]
  * @property {Item[]} [dependents]
  * @property {String} [id]
  * @property {Stack} [items]
  * @property {Level} level
  *
  * @typedef {String | (String | YamlItem | (String | YamlItem)[])[]} Yaml
  *
  * @typedef YamlItem
  * @property {String | YamlDependsUpon | (String | YamlDependsUpon)[]} [dependsUpon]
  * @property {String} [id]
  * @property {Yaml} [items]
  *
  * @typedef YamlDependsUpon
  * @property {String} id
  * @property {(String | YamlDependsUpon)[]} [items]
 */