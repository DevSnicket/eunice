const
	testDependsUponChildMissingFromMissing = require("./testDependsUponChildMissingFromMissing"),
	testDependsUponTwoChildrenMissingFromMissing = require("./testDependsUponTwoChildrenMissingFromMissing"),
	testFirstDependsUponChildMissingFromSecond = require("./testFirstDependsUponChildMissingFromSecond"),
	testFirstDependsUponChildOfSecond = require("./testFirstDependsUponChildOfSecond"),
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
				testFirstDependsUponTwoChildrenOfSecond(test);
			},
		);