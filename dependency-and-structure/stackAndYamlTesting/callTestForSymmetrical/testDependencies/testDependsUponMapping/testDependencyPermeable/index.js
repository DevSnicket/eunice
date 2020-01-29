// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	testFirstDependsUponChildOfPermeableSecondInParent = require("./testFirstDependsUponChildOfPermeableSecondInParent"),
	testFirstDependsUponChildOfSecond = require("./testFirstDependsUponChildOfSecond"),
	testFirstDependsUponGrandchildOfPermeableChildOfPermeableSecondInParent = require("./testFirstDependsUponGrandchildOfPermeableChildOfPermeableSecondInParent"),
	testFirstDependsUponGrandchildOfPermeableInChildOfSecondInParent = require("./testFirstDependsUponGrandchildOfPermeableInChildOfSecondInParent"),
	testFirstDependsUponGrandchildOfSecondWithPermeableChild = require("./testFirstDependsUponGrandchildOfSecondWithPermeableChild"),
	testFirstDependsUponSameIdentifierAsGrandchild = require("./testFirstDependsUponSameIdentifierAsGrandchild");

module.exports =
	/** @type {import("../../../Parameter.d")} */
	stackAndYamlTest =>
		describe(
			"dependency permeable",
			() => {
				testFirstDependsUponChildOfPermeableSecondInParent(stackAndYamlTest);
				testFirstDependsUponChildOfSecond(stackAndYamlTest);
				testFirstDependsUponGrandchildOfPermeableChildOfPermeableSecondInParent(stackAndYamlTest);
				testFirstDependsUponGrandchildOfPermeableInChildOfSecondInParent(stackAndYamlTest);
				testFirstDependsUponGrandchildOfSecondWithPermeableChild(stackAndYamlTest);
				testFirstDependsUponSameIdentifierAsGrandchild(stackAndYamlTest);
			},
		);