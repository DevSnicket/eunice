// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const replaceIdentifiersAndItemsAndLevelsAndStacks = require("../replaceIdentifiersAndItemsAndLevelsAndStacks");

module.exports =
	({
		identifierOrItemOrLevelOrStack,
		replace,
	}) =>
		replaceIdentifiersAndItemsAndLevelsAndStacks({
			identifierOrItemOrLevelOrStack,
			replace:
				withReplaceIdentifierOrItem(replace)
				.replaceIdentifierOrItemOrLevelOrStack,
		});

function withReplaceIdentifierOrItem(
	replaceIdentifierOrItem,
) {
	return { replaceIdentifierOrItemOrLevelOrStack };

	function replaceIdentifierOrItemOrLevelOrStack({
		ancestors,
		identifierOrItemOrLevelOrStack,
	}) {
		return identifierOrItemOrLevelOrStack && replaceValue();

		function replaceValue() {
			return (
				whenLevelOrStack()
				||
				replaceIdentifierOrItem({
					ancestors,
					identifierOrItem: identifierOrItemOrLevelOrStack,
				})
			);
		}

		function whenLevelOrStack() {
			return (
				Array.isArray(identifierOrItemOrLevelOrStack)
				&&
				identifierOrItemOrLevelOrStack.map(
					withAncestors(ancestors)
					.replaceIdentifierOrItemOrLevel,
				)
			);
		}
	}

	function withAncestors(
		ancestors,
	) {
		return { replaceIdentifierOrItemOrLevel };

		function replaceIdentifierOrItemOrLevel(
			identifierOrItemOrLevel,
		) {
			return (
				whenLevel()
				||
				replaceIdentifierOrItem({
					ancestors,
					identifierOrItem:
						identifierOrItemOrLevel,
				})
			);

			function whenLevel() {
				return (
					Array.isArray(identifierOrItemOrLevel)
					&&
					replaceLevel(identifierOrItemOrLevel)
				);
			}
		}

		function replaceLevel(
			level,
		) {
			return (
				level.map(
					identifierOrItem =>
						replaceIdentifierOrItem({
							ancestors,
							identifierOrItem,
						}),
				)
			);
		}
	}
}