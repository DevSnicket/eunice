// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createStackFromLevels from "../../../../stackAndYamlTesting/createStackFromLevels";

export default
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