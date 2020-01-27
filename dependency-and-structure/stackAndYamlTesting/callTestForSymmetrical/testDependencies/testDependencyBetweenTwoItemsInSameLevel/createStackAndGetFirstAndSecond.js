// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createFirstAndSecondLevel = require("../../createFirstAndSecondLevel"),
	createStackFromLevels = require("../../../createStackFromLevels");

module.exports =
	() => {
		const stack = createStackFromLevels([ createFirstAndSecondLevel() ]);

		const [ first, second ] = stack[0];

		return (
			{
				first,
				second,
				stack,
			}
		);
	};