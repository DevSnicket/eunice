// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	testFirstDependsUponChildOfPermeableSecondInParent = require("./testFirstDependsUponChildOfPermeableSecondInParent"),
	testFirstDependsUponChildOfSecond = require("./testFirstDependsUponChildOfSecond"),
	testFirstDependsUponGrandchildOfPermeableChildOfPermeableSecondInParent = require("./testFirstDependsUponGrandchildOfPermeableChildOfPermeableSecondInParent"),
	testFirstDependsUponGrandchildOfPermeableInChildOfSecondInParent = require("./testFirstDependsUponGrandchildOfPermeableInChildOfSecondInParent"),
	testFirstDependsUponGrandchildOfSecondWithPermeableChild = require("./testFirstDependsUponGrandchildOfSecondWithPermeableChild"),
	testFirstDependsUponSameIdentifierAsGrandchild = require("./testFirstDependsUponSameIdentifierAsGrandchild");

module.exports =
	test =>
		describe(
			"dependency permeable",
			() => {
				testFirstDependsUponChildOfPermeableSecondInParent(test);
				testFirstDependsUponChildOfSecond(test);
				testFirstDependsUponGrandchildOfPermeableChildOfPermeableSecondInParent(test);
				testFirstDependsUponGrandchildOfPermeableInChildOfSecondInParent(test);
				testFirstDependsUponGrandchildOfSecondWithPermeableChild(test);
				testFirstDependsUponSameIdentifierAsGrandchild(test);
			},
		);