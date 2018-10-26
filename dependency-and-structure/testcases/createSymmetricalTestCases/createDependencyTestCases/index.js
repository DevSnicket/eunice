const
	createFirstDependsUponSecondAndThirdTestCase = require("./createFirstDependsUponSecondAndThirdTestCase"),
	createFirstSecondTestCases = require("./createFirstAndSecondTestCases");

module.exports =
	() =>
		[
			...createFirstSecondTestCases(),
			createFirstDependsUponSecondAndThirdTestCase(),
		];