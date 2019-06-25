/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

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