/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	testDependencyBetweenTwoItemsInSameLevel = require("./testDependencyBetweenTwoItemsInSameLevel"),
	testDependsUponMapping = require("./testDependsUponMapping"),
	testFirstDependsUponSecondAndThird = require("./testFirstDependsUponSecondAndThird");

module.exports =
	test =>
		describe(
			"dependencies",
			() => {
				testDependencyBetweenTwoItemsInSameLevel(test);
				testFirstDependsUponSecondAndThird(test);
				testDependsUponMapping(test);
			},
		);