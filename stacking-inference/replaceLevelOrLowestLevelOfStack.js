// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { createStackFromYaml, createYamlFromStack } from "@devsnicket/eunice-dependency-and-structure";

export default ({
	levelOrStack,
	replaceLevelWithStack,
}) => {
	return (
		createYamlFromStack(
			whenStack()
			||
			replaceLevelWithStack(levelOrStack),
		)
	);

	function whenStack() {
		return (
			isStack()
			&&
			splitStack()
		);

		function isStack() {
			return levelOrStack.some(Array.isArray);
		}

		function splitStack() {
			const lowestLevel = levelOrStack.pop();

			return (
				[
					...createStackFromYaml(levelOrStack),
					...replaceLevelWithStack(lowestLevel),
				]
			);
		}
	}
};