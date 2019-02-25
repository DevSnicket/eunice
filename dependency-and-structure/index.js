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
  * @property {(DependUpon|DependUponMissingItem|DependUponMissingParent)[]} [dependsUpon]
  * @property {Item[]} [dependents]
  * @property {String} [id]
  * @property {Stack} [items]
  * @property {Level} level
  *
  * @typedef DependUpon
  * @property {Item} item
  * @property {Item} [parent]
  *
  * @typedef DependUponMissingItem
  * @property {String} item
  * @property {Item} [parent]
  *
  * @typedef DependUponMissingParent
  * @property {String} item
  * @property {String} [parent]
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