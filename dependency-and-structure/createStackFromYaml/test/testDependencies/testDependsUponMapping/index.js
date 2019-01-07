const
	testDependsUponMissing = require("./testDependsUponMissing"),
	testDependsUponTwoChildrenMissingFromMissing = require("./testDependsUponTwoChildrenMissingFromMissing"),
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
				testDependsUponTwoChildrenMissingFromMissing();
				testFirstDependsUponChildMissingFromSecond();
				testFirstDependsUponChildOfSecond();
				testFirstDependsUponSecond();
				testFirstDependsUponTwoChildrenOfSecond();
			},
		);