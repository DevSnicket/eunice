/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	testChildOfFirstDependsUponSecond = require("./testChildOfFirstDependsUponSecond"),
	testDependsUponDescendant = require("./testDependsUponDescendant"),
	testDependsUponMapping = require("./testDependsUponMapping"),
	testFirstAndSecondDependsUponThird = require("./testFirstAndSecondDependsUponThird"),
	testFirstChildDependsUponParentAndSecondChildWithGrandchildWithParentIdentifier = require("./testFirstChildDependsUponParentAndSecondChildWithGrandchildWithParentIdentifier"),
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
				testDependsUponDescendant();
				testDependsUponMapping();
				testFirstAndSecondDependsUponThird();
				testFirstChildDependsUponParentAndSecondChildWithGrandchildWithParentIdentifier();
				testParentAndChild();
				testSelfDependentParentAndChild();
				testSelfDependent();
				testUpperAndLower();
			},
		);