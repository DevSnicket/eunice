const
	testDependsUponChildMissingFromMissing = require("./testDependsUponChildMissingFromMissing"),
	testDependsUponTwoChildrenMissingFromMissing = require("./testDependsUponTwoChildrenMissingFromMissing");

module.exports =
	test =>
		describe(
			"mapping",
			() => {
				testDependsUponChildMissingFromMissing(test);
				testDependsUponTwoChildrenMissingFromMissing(test);
			},
		);