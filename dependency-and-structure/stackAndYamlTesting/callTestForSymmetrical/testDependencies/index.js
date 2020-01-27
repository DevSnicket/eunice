// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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