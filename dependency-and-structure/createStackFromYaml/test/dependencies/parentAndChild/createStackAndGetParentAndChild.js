/* Copyright (c) 2020 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createParentChildLevels = require("../../../../tests/createParentChildLevels"),
	createStackFromLevels = require("../../../../tests/createStackFromLevels");

module.exports =
	() => {
		const stack = createStackFromLevels(createParentChildLevels());

		const parent = stack[0][0];

		return (
			{
				child: parent.items[0][0],
				parent,
				stack,
			}
		);
	};