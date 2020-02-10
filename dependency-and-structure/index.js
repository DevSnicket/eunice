// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export * from "./createStackFromYaml";
export * from "./createYamlFromStack";
export * from "./findDirectionBetweenItemsInFirstMutualStack";
export * from "./findItemInStackWithIdentifierHierarchy";
export * from "./isInnerStack";

/**
  * @typedef HasOptionalParentItem
  * @property {Item} [parent]
  *
  * @typedef {Level[] & HasOptionalParentItem} Stack
  *
  * @typedef Item
  * @property {(DependUpon | DependUponMissing)[]} [dependsUpon]
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
  * @property {Item} [ancestor]
  * @property {Item} item
  *
  * @typedef DependUponMissing
  * @property {(Item | String)[]} [ancestors]
  * @property {String} item
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