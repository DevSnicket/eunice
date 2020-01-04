/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	testDependencyPermeable = require("./testDependencyPermeable"),
	testDependsUponMissingChildInMissingParent = require("./testDependsUponMissingChildInMissingParent"),
	testDependsUponMissingGrandchildInMissingChildInMissingParent = require("./testDependsUponMissingGrandchildInMissingChildInMissingParent"),
	testDependsUponMissingGreatGrandchildInMssingGrandchildInMissingChildInMissingParent = require("./testDependsUponMissingGreatGrandchildInMissingGrandchildInMissingChildInMissingParent"),
	testDependsUponTwoMissingChildrenInMissingParent = require("./testDependsUponTwoMissingChildrenInMissingParent"),
	testFirstDependsUponChildAndMissingChildInSecond = require("./testFirstDependsUponChildAndMissingChildInSecond"),
	testFirstDependsUponChildInSecond = require("./testFirstDependsUponChildInSecond"),
	testFirstDependsUponChildInSecondAndSecond = require("./testFirstDependsUponChildInSecondAndSecond"),
	testFirstDependsUponGrandchildInSecond = require("./testFirstDependsUponGrandchildInSecond"),
	testFirstDependsUponGrandchildInSecondAndChildInSecond = require("./testFirstDependsUponGrandchildInSecondAndChildInSecond"),
	testFirstDependsUponMissingChildInSecond = require("./testFirstDependsUponMissingChildInSecond"),
	testFirstDependsUponMissingChildInSecondAndSecond = require("./testFirstDependsUponMissingChildInSecondAndSecond"),
	testFirstDependsUponMissingGrandchildInMissingChildInSecond = require("./testFirstDependsUponMissingGrandchildInMissingChildInSecond"),
	testFirstDependsUponMissingGrandchildInSecond = require("./testFirstDependsUponMissingGrandchildInSecond"),
	testFirstDependsUponMissingGreatGrandchildInMissingGrandchildInMissingChildInSecond = require("./testFirstDependsUponMissingGreatGrandchildInMissingGrandchildInMissingChildInSecond"),
	testFirstDependsUponTwoChildrenInSecond = require("./testFirstDependsUponTwoChildrenInSecond"),
	testFirstDependsUponTwoChildrenInSecondAndSecond = require("./testFirstDependsUponTwoChildrenInSecondAndSecond"),
	testFirstDependsUponTwoGrandchildrenInChildInSecond = require("./testFirstDependsUponTwoGrandchildrenInChildInSecond"),
	testFirstDependsUponTwoGrandchildrenInTwoChildrenInSecond = require("./testFirstDependsUponTwoGrandchildrenInTwoChildrenInSecond"),
	testFirstDependsUponTwoMissingGrandchildrenInTwoChildrenInSecond = require("./testFirstDependsUponTwoMissingGrandchildrenInTwoChildrenInSecond"),
	testFirstDependsUponTwoMissingGrandchildrenInTwoMissingChildInSecond = require("./testFirstDependsUponTwoMissingGrandchildrenInTwoMissingChildInSecond");

module.exports =
	test =>
		describe(
			"depends upon mapping",
			() => {
				testDependencyPermeable(test);
				testDependsUponMissingChildInMissingParent(test);
				testDependsUponMissingGrandchildInMissingChildInMissingParent(test);
				testDependsUponMissingGreatGrandchildInMssingGrandchildInMissingChildInMissingParent(test);
				testDependsUponTwoMissingChildrenInMissingParent(test);
				testFirstDependsUponChildAndMissingChildInSecond(test);
				testFirstDependsUponChildInSecond(test);
				testFirstDependsUponChildInSecondAndSecond(test);
				testFirstDependsUponGrandchildInSecond(test);
				testFirstDependsUponGrandchildInSecondAndChildInSecond(test);
				testFirstDependsUponMissingChildInSecond(test);
				testFirstDependsUponMissingChildInSecondAndSecond(test);
				testFirstDependsUponMissingGrandchildInMissingChildInSecond(test);
				testFirstDependsUponMissingGrandchildInSecond(test);
				testFirstDependsUponMissingGreatGrandchildInMissingGrandchildInMissingChildInSecond(test);
				testFirstDependsUponTwoChildrenInSecond(test);
				testFirstDependsUponTwoChildrenInSecondAndSecond(test);
				testFirstDependsUponTwoGrandchildrenInChildInSecond(test);
				testFirstDependsUponTwoGrandchildrenInTwoChildrenInSecond(test);
				testFirstDependsUponTwoMissingGrandchildrenInTwoChildrenInSecond(test);
				testFirstDependsUponTwoMissingGrandchildrenInTwoMissingChildInSecond(test);
			},
		);