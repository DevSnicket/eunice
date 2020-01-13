// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	{ createStackFromYaml, createYamlFromStack } = require("@devsnicket/eunice-dependency-and-structure"),
	inferStackFromLevel = require("./inferStackFromLevel"),
	{ replaceIdentifiersAndItemsAndLevelsAndStacks } = require("@devsnicket/eunice-processors").replacement;

module.exports =
	identifierOrItemOrLevelOrStack =>
		replaceIdentifiersAndItemsAndLevelsAndStacks({
			identifierOrItemOrLevelOrStack,
			replace: splitWhenLevelOrGetIdentifierOrItemOrStack,
		});

function splitWhenLevelOrGetIdentifierOrItemOrStack(
	{ identifierOrItemOrLevelOrStack },
) {
	return whenLevelOrStack() || identifierOrItemOrLevelOrStack;

	function whenLevelOrStack() {
		return (
			Array.isArray(identifierOrItemOrLevelOrStack)
			&&
			splitLevelOrStack(identifierOrItemOrLevelOrStack)
		);
	}
}

function splitLevelOrStack(
	levelOrStack,
) {
	return (
		createYamlFromStack(
			whenStack()
			||
			inferStackFromLevel(
				levelOrStack,
			),
		)
	);

	function whenStack() {
		return (
			isStack()
			&&
			splitStack(levelOrStack)
		);

		function isStack() {
			return levelOrStack.some(Array.isArray);
		}
	}
}

function splitStack(
	stack,
) {
	const lowestLevel = stack.pop();

	return (
		[
			...createStackFromYaml(stack),
			...inferStackFromLevel(lowestLevel),
		]
	);
}