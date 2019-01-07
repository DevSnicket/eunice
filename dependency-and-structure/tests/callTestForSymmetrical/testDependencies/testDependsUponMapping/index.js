const testDependsUponChildMissingFromMissing = require("./testDependsUponChildMissingFromMissing");

module.exports =
	test =>
		describe(
			"mapping",
			() =>
				testDependsUponChildMissingFromMissing(test),
		);