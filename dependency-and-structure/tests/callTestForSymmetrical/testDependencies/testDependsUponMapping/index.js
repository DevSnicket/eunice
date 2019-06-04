const
	testDependsUponChildMissingFromMissing = require("./testDependsUponChildMissingFromMissing"),
	testDependsUponTwoChildrenMissingFromMissing = require("./testDependsUponTwoChildrenMissingFromMissing"),
	testFirstDependsUponChildMissingFromSecond = require("./testFirstDependsUponChildMissingFromSecond"),
	testFirstDependsUponChildOfSecond = require("./testFirstDependsUponChildOfSecond"),
	testFirstDependsUponSecondAndChildOfSecond = require("./testFirstDependsUponSecondAndChildOfSecond"),
	testFirstDependsUponSecondAndTwoChildrenOfSecond = require("./testFirstDependsUponSecondAndTwoChildrenOfSecond"),
	testFirstDependsUponTwoChildrenOfSecond = require("./testFirstDependsUponTwoChildrenOfSecond");

module.exports =
	test =>
		describe(
			"mapping",
			() => {
				testDependsUponChildMissingFromMissing(test);
				testDependsUponTwoChildrenMissingFromMissing(test);
				testFirstDependsUponChildMissingFromSecond(test);
				testFirstDependsUponChildOfSecond(test);
				testFirstDependsUponSecondAndChildOfSecond(test);
				testFirstDependsUponSecondAndTwoChildrenOfSecond(test);
				testFirstDependsUponTwoChildrenOfSecond(test);
			},
		);