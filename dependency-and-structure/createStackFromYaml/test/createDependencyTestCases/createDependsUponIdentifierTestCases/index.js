const
	createDependsUponMissingIdentifierTestCase = require("./createDependsUponMissingIdentifierTestCase"),
	createFirstDependsUponChildOfSecondTestCase = require("./createFirstDependsUponChildOfSecondTestCase"),
	createFirstDependsUponIdentifierOfSecondTestCase = require("./createFirstDependsUponIdentifierOfSecondTestCase"),
	createFirstDependsUponTwoChildrenOfSecondTestCase = require("./createFirstDependsUponTwoChildrenOfSecondTestCase");

module.exports =
	() =>
		[
			createDependsUponMissingIdentifierTestCase(),
			createFirstDependsUponChildOfSecondTestCase(),
			createFirstDependsUponIdentifierOfSecondTestCase(),
			createFirstDependsUponTwoChildrenOfSecondTestCase(),
		];