/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

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