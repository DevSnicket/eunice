/* Copyright (c) 2020 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createFirstAndSecondLevel = require("../../createFirstAndSecondLevel"),
	createStackFromLevels = require("../../../createStackFromLevels");

module.exports =
	() => {
		const stack = createStackFromLevels([ createFirstAndSecondLevel() ]);

		const level = stack[0];

		return (
			{
				first: level[0],
				second: level[1],
				stack,
			}
		);
	};