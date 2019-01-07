const
	testDependsUponMissing = require("./testDependsUponMissing"),
	testFirstDependsUponChildMissingFromSecond = require("./testFirstDependsUponChildMissingFromSecond"),
	testFirstDependsUponChildOfSecond = require("./testFirstDependsUponChildOfSecond"),
	testFirstDependsUponSecond = require("./testFirstDependsUponSecond"),
	testFirstDependsUponTwoChildrenOfSecond = require("./testFirstDependsUponTwoChildrenOfSecond");

module.exports =
	() =>
		describe(
			"mapping",
			() => {
				testDependsUponMissing();
				testFirstDependsUponChildMissingFromSecond();
				testFirstDependsUponChildOfSecond();
				testFirstDependsUponSecond();
				testFirstDependsUponTwoChildrenOfSecond();
			},
		);