/* Copyright (c) 2020 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const createStackFromLevels = require("../../../../stackAndYamlTesting/createStackFromLevels");

module.exports =
	identifier => {
		const stack =
			createStackFromLevels(
				[
					[
						{
							id: identifier,
							items:
								[
									[
										{
											id: identifier,
											otherIdentifier: "child",
										},
									],
								],
							otherIdentifier: "parent",
						},
					],
				],
			);

		return (
			{
				parent: stack[0][0],
				stack,
			}
		);
	};