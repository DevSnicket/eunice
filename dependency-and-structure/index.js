const
	createStackFromYaml = require("./createStackFromYaml"),
	createYamlFromStack = require("./createYamlFromStack"),
	findDirectionBetweenItemsInFirstMutualStack = require("./findDirectionBetweenItemsInFirstMutualStack"),
	findItemInStackWithIdentifierHierarchy = require("./findItemInStackWithIdentifierHierarchy"),
	isInnerStack = require("./isInnerStack");

module.exports =
	{
		createStackFromYaml,
		createYamlFromStack,
		findDirectionBetweenItemsInFirstMutualStack,
		findItemInStackWithIdentifierHierarchy,
		isInnerStack,
	};

/**
  * @typedef HasParentItem
  * @property {Item} parent
  *
  * @typedef {Level[] & HasParentItem} Stack
  *
  * @typedef Item
  * @property {(DependUpon|DependUponMissingItem|DependUponMissingParent)[]} [dependsUpon]
  * @property {Item[]} [dependents]
  * @property {String} [id]
  * @property {Stack} [items]
  * @property {Level} level
  *
  * @typedef HasStack
  * @property {Stack} stack
  *
  * @typedef {Item[] & HasStack} Level
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