/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

// istanbul ignore file: test would be a mirror of implementation

const
	createStackStructureFromYaml = require("./createStackStructureFromYaml"),
	initializeDependenciesInStack = require("./initializeDependenciesInStack");

module.exports =
	/** @return {import("../index").Stack} */
	(/** @type {import("./Parameter.d")} */{
		dependenciesInDescendantsOfItemPredicate = null,
		yaml,
	}) => {
		const stack = createStackStructureFromYaml(yaml);

		initializeDependenciesInStack({
			inDescendantsOfItemPredicate:
				dependenciesInDescendantsOfItemPredicate,
			stack,
		});

		return stack;
	};