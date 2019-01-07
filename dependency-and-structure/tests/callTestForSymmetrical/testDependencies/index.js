const
	testDependencyBetweenTwoItem = require("./testDependencyBetweenTwoItem"),
	testDependsUponMapping = require("./testDependsUponMapping"),
	testFirstDependsUponSecondAndThird = require("./testFirstDependsUponSecondAndThird");

module.exports =
	test =>
		describe(
			"dependencies",
			() => {
				testDependencyBetweenTwoItem(test);
				testFirstDependsUponSecondAndThird(test);
				testDependsUponMapping(test);
			},
		);