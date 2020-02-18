// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

import replaceIdentifiersAndItemsAndLevelsAndStacks from "../replaceIdentifiersAndItemsAndLevelsAndStacks";

export default ({
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
				Array.isArray(identifierOrItemOrLevelOrStack)
				?
				getLevelOrStackOrSingleItem(
					mapFilter(
						identifierOrItemOrLevelOrStack,
						withAncestors(ancestors).replaceIdentifierOrItemOrLevel,
					),
				)
				:
				replaceIdentifierOrItem({
					ancestors,
					identifierOrItem: identifierOrItemOrLevelOrStack,
				})
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
				Array.isArray(identifierOrItemOrLevel)
				?
				replaceLevel(identifierOrItemOrLevel)
				:
				replaceIdentifierOrItem({
					ancestors,
					identifierOrItem:
						identifierOrItemOrLevel,
				})
			);
		}

		function replaceLevel(
			level,
		) {
			return (
				mapFilter(
					level,
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

function mapFilter(
	array,
	selector,
) {
	return (
		getWhenNotEmpty(
			array
			.map(selector)
			.filter(item => item),
		)
	);
}

function getWhenNotEmpty(
	array,
) {
	return whenEmpty() || null;

	function whenEmpty() {
		return array.length && array;
	}
}

function getLevelOrStackOrSingleItem(
	array,
) {
	return whenSingle() || array;

	function whenSingle() {
		return (
			array
			&&
			array.length === 1
			&&
			getLevelOrStackOrSingleItem(array[0])
		);
	}
}