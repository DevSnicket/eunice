// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

import "core-js/features/array/flat";
import "core-js/features/array/flat-map";

import getStackOrSingleLevelOrSingleItem from "../../getStackOrSingleLevelOrSingleItem";

export default ({
	getLevelOrStackForTargetIdentifierOrItem,
	targetLevelOrStack,
}) =>
	withGetLevelOrStackForTargetIdentifierOrItem(
		getLevelOrStackForTargetIdentifierOrItem,
	)
	.mapTargetLevelOrStack(
		targetLevelOrStack,
	);

function withGetLevelOrStackForTargetIdentifierOrItem(
	getLevelOrStackForTargetIdentifierOrItem,
) {
	return { mapTargetLevelOrStack };

	function mapTargetLevelOrStack(
		targetLevelOrStack,
	) {
		return (
			simplifyStructureWhenLevelOrStack(
				whenTargetOfStack() || asTargetOfLevel(),
			)
		);

		function whenTargetOfStack() {
			return (
				isStack(targetLevelOrStack)
				&&
				targetLevelOrStack.flatMap(getStackForTargetIdentifierOrLevel)
			);
		}

		function asTargetOfLevel() {
			return (
				targetLevelOrStack.length === 1
				?
				getSingle()
				:
				flattenMultiple()
			);

			function getSingle() {
				return (
					getLevelOrStackForTargetIdentifierOrItem(
						targetLevelOrStack[0],
					)
				);
			}

			function flattenMultiple() {
				return (
					targetLevelOrStack
					.flatMap(getEmptyLevelOrStackForTargetIdentifierOrItem)
					.flat()
				);
			}
		}
	}

	function getStackForTargetIdentifierOrLevel(
		targetIdentifierOrItemOrLevel,
	) {
		return (
			ensureIsStack(
				whenTargetOfLevel()
				||
				ensureIsLevel(
					getLevelOrStackForTargetIdentifierOrItem(
						targetIdentifierOrItemOrLevel,
					),
				),
			)
		);

		function whenTargetOfLevel() {
			return (
				Array.isArray(targetIdentifierOrItemOrLevel)
				&&
				targetIdentifierOrItemOrLevel.flatMap(
					getEmptyLevelOrStackForTargetIdentifierOrItem,
				)
			);
		}
	}

	function getEmptyLevelOrStackForTargetIdentifierOrItem(
		targetIdentifierOrItem,
	) {
		return (
			getLevelOrStackForTargetIdentifierOrItem(
				targetIdentifierOrItem,
			)
			||
			[]
		);
	}
}

function ensureIsStack(
	levelOrStack,
) {
	return (
		whenEmptyOrStack()
		||
		[ levelOrStack ]
	);

	function whenEmptyOrStack() {
		return isEmptyOrStack() && levelOrStack;

		function isEmptyOrStack() {
			return (
				!levelOrStack.length
				||
				isStack(levelOrStack)
			);
		}
	}
}

function ensureIsLevel(
	itemOrLevel,
) {
	return whenLevel() || [ itemOrLevel ];

	function whenLevel() {
		return (
			Array.isArray(itemOrLevel)
			&&
			itemOrLevel
		);
	}
}

function isStack(
	levelOrStack,
) {
	return levelOrStack.some(Array.isArray);
}

function simplifyStructureWhenLevelOrStack(
	identifierOrItemOrLevelOrStack,
) {
	return (
		Array.isArray(identifierOrItemOrLevelOrStack)
		?
		whenLevelOrStack()
		:
		identifierOrItemOrLevelOrStack
	);

	function whenLevelOrStack() {
		return (
			identifierOrItemOrLevelOrStack.length
			?
			getStackOrSingleLevelOrSingleItem(identifierOrItemOrLevelOrStack)
			:
			null
		);
	}
}