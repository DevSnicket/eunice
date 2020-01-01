/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	testFirstDependsUponChildOfSecond = require("./testFirstDependsUponChildOfSecond"),
	testFirstDependsUponGrandchildOfSecondWithPermeableChild = require("./testFirstDependsUponGrandchildOfSecondWithPermeableChild"),
	testFirstDependsUponSameIdentifierAsGrandchild = require("./testFirstDependsUponSameIdentifierAsGrandchild");

module.exports =
	test =>
		describe(
			"dependency permeable",
			() => {
				testFirstDependsUponChildOfSecond(test);
				testFirstDependsUponGrandchildOfSecondWithPermeableChild(test);
				testFirstDependsUponSameIdentifierAsGrandchild(test);
			},
		);