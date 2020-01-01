/* Copyright (c) 2020 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createStackFromLevels = require("../../../../tests/createStackFromLevels"),
	createUpperAndLowerStack = require("../../../../tests/createUpperAndLowerStack");

module.exports =
	() => {
		const stack = createStackFromLevels(createUpperAndLowerStack());

		return (
			{
				lower: stack[1][0],
				stack,
				upper: stack[0][0],
			}
		);
	};