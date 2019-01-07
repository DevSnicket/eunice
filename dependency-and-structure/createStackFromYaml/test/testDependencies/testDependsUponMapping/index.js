const
	testDependsUponMissing = require("./testDependsUponMissing"),
	testFirstDependsUponSecond = require("./testFirstDependsUponSecond");

module.exports =
	() =>
		describe(
			"mapping",
			() => {
				testDependsUponMissing();
				testFirstDependsUponSecond();
			},
		);