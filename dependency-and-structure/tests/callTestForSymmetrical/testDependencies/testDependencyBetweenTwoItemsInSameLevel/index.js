/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	testFirstDependsUponSecond = require("./testFirstDependsUponSecond"),
	testSecondDependsUponFirst = require("./testSecondDependsUponFirst");

module.exports =
	test =>
		describe(
			"dependency in same level",
			() => {
				testFirstDependsUponSecond(test);
				testSecondDependsUponFirst(test);
			},
		);