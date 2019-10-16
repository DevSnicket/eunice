/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	testFirstDependsUponChildOfSecond = require("./testFirstDependsUponChildOfSecond"),
	testFirstDependsUponGrandchildOfSecond = require("./testFirstDependsUponGrandchildOfSecond"),
	testNoChildrenInSecond = require("./testNoChildrenInSecond");

module.exports =
	() =>
		describe(
			"with in descendants",
			() => {
				testFirstDependsUponChildOfSecond();
				testFirstDependsUponGrandchildOfSecond();
				testNoChildrenInSecond();
			},
		);