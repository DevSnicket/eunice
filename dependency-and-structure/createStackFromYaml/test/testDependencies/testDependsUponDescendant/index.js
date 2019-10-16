/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	testFirstDependsUponSameIdentifierAsChildOfSecond = require("./testFirstDependsUponSameIdentifierAsChildOfSecond"),
	withInDescendants = require("./withInDescendants");

module.exports =
	() =>
		describe(
			"depends upon descendant",
			() => {
				testFirstDependsUponSameIdentifierAsChildOfSecond();
				withInDescendants();
			},
		);