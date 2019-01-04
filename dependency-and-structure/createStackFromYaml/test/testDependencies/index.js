const
	testChildOfFirstDependsUponSecond = require("./testChildOfFirstDependsUponSecond"),
	testDependsUponMapping = require("./testDependsUponMapping"),
	testFirstAndSecondDependsUponThird = require("./testFirstAndSecondDependsUponThird"),
	testFirstChildDependsUponParentAndSecondChildWithGrandchildWithParentIdentifier = require("./testFirstChildDependsUponParentAndSecondChildWithGrandchildWithParentIdentifier"),
	testFirstDependsUponChildOfSecond = require("./testFirstDependsUponChildOfSecond"),
	testFirstDependsUponGrandchildOfSecond = require("./testFirstDependsUponGrandchildOfSecond"),
	testParentAndChild = require("./testParentAndChild"),
	testSelfDependent = require("./testSelfDependent"),
	testSelfDependentParentAndChild = require("./testSelfDependentParentAndChild"),
	testUpperAndLower = require("./testUpperAndLower");

module.exports =
	() =>
		describe(
			"dependencies",
			() => {
				testChildOfFirstDependsUponSecond();
				testDependsUponMapping();
				testFirstAndSecondDependsUponThird();
				testFirstChildDependsUponParentAndSecondChildWithGrandchildWithParentIdentifier();
				testFirstDependsUponChildOfSecond();
				testFirstDependsUponGrandchildOfSecond();
				testParentAndChild();
				testSelfDependentParentAndChild();
				testSelfDependent();
				testUpperAndLower();
			},
		);