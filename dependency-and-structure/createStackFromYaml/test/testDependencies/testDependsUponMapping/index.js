const
	testDependsUponMissing = require("./testDependsUponMissing"),
	testFirstDependsUponChildOfSecond = require("./testFirstDependsUponChildOfSecond"),
	testFirstDependsUponSecond = require("./testFirstDependsUponSecond"),
	testFirstDependsUponTwoChildrenOfSecond = require("./testFirstDependsUponTwoChildrenOfSecond");

module.exports =
	() =>
		describe(
			"mapping",
			() => {
				testDependsUponMissing();
				testFirstDependsUponChildOfSecond();
				testFirstDependsUponSecond();
				testFirstDependsUponTwoChildrenOfSecond();
			},
		);