// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createStackFromYamlWithAncestors = require("./createStackFromYamlWithAncestors"),
	inferStackFromLevel = require("./inferStackFromLevel"),
	{ replaceIdentifiersAndItemsAndLevelsAndStacks } = require("@devsnicket/eunice-processors").replacement,
	replaceLevelOrLowestLevelOfStack = require("./replaceLevelOrLowestLevelOfStack");

module.exports =
	identifierOrItemOrLevelOrStack =>
		replaceIdentifiersAndItemsAndLevelsAndStacks({
			identifierOrItemOrLevelOrStack,
			replace:
				replaceIdentifierOrItemOrLevelOrStack,
		});

function replaceIdentifierOrItemOrLevelOrStack({
	ancestors,
	identifierOrItemOrLevelOrStack,
}) {
	return whenLevelOrStack() || identifierOrItemOrLevelOrStack;

	function whenLevelOrStack() {
		return (
			Array.isArray(identifierOrItemOrLevelOrStack)
			&&
			replaceLevelOrLowestLevelOfStack({
				levelOrStack:
					identifierOrItemOrLevelOrStack,
				replaceLevelWithStack:
					level =>
						inferStackFromLevel({
							createStackFromYaml:
								yaml =>
									createStackFromYamlWithAncestors({
										ancestors,
										yaml,
									}),
							level,
						}),
			})
		);
	}
}