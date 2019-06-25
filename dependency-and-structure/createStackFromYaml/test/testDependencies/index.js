/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	testChildOfFirstDependsUponSecond = require("./testChildOfFirstDependsUponSecond"),
	testDependsUponMapping = require("./testDependsUponMapping"),
	testFirstAndSecondDependsUponThird = require("./testFirstAndSecondDependsUponThird"),
	testFirstChildDependsUponParentAndSecondChildWithGrandchildWithParentIdentifier = require("./testFirstChildDependsUponParentAndSecondChildWithGrandchildWithParentIdentifier"),
	testFirstDependsUponChildOfSecond = require("./testFirstDependsUponChildOfSecond"),
	testFirstDependsUponGrandchildOfSecond = require("./testFirstDependsUponGrandchildOfSecond"),
	testParentAndChild = require("./testParentAndChild"),
	testSelfDependent = require("./testSelfDependent"),
	testSelfDependentParentAndChild = require("./testSelfDependentParentAndChild"),
	testUpperAndLower = require("./testUpperAndLower");

module.exports =
	() =>
		describe(
			"dependencies",
			() => {
				testChildOfFirstDependsUponSecond();
				testDependsUponMapping();
				testFirstAndSecondDependsUponThird();
				testFirstChildDependsUponParentAndSecondChildWithGrandchildWithParentIdentifier();
				testFirstDependsUponChildOfSecond();
				testFirstDependsUponGrandchildOfSecond();
				testParentAndChild();
				testSelfDependentParentAndChild();
				testSelfDependent();
				testUpperAndLower();
			},
		);