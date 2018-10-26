const
	createChildOfFirstDependsUponSecond = require("./createChildOfFirstDependsUponSecond"),
	createDependsUponIdentifierTestCases = require("./createDependsUponIdentifierTestCases"),
	createFirstAndSecondDependsUponThirdTestCase = require("./createFirstAndSecondDependsUponThirdTestCase"),
	createFirstChildDependsUponParentAndSecondChildWithGrandchildWithParentIdentifierTestCase = require("./createFirstChildDependsUponParentAndSecondChildWithGrandchildWithParentIdentifierTestCase"),
	createFirstDependsUponChildOfSecondTestCase = require("./createFirstDependsUponChildOfSecondTestCase"),
	createFirstDependsUponGrandchildOfSecondTestCase = require("./createFirstDependsUponGrandchildOfSecondTestCase"),
	createParentAndChildTestCases = require("./createParentAndChildTestCases"),
	createSelfDependentParentAndChildTestCases = require("./createSelfDependentParentAndChildTestCases"),
	createSelfDependentTestCase = require("./createSelfDependentTestCase"),
	createUpperAndLowerTestCases = require("./createUpperAndLowerTestCases");

module.exports =
	() =>
		[
			createChildOfFirstDependsUponSecond(),
			...createDependsUponIdentifierTestCases(),
			createFirstAndSecondDependsUponThirdTestCase(),
			createFirstChildDependsUponParentAndSecondChildWithGrandchildWithParentIdentifierTestCase(),
			createFirstDependsUponChildOfSecondTestCase(),
			createFirstDependsUponGrandchildOfSecondTestCase(),
			...createParentAndChildTestCases(),
			...createSelfDependentParentAndChildTestCases(),
			createSelfDependentTestCase(),
			...createUpperAndLowerTestCases(),
		];