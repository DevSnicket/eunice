// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

require("array.prototype.flat")
.shim();

const
	filterIdentifierOrItemOrLevelOrStack = require("./filterIdentifierOrItemOrLevelOrStack"),
	getIdentifiersInTargetLevelOrStack = require("./getIdentifiersInTargetLevelOrStack"),
	getStackOrSingleLevelOrSingleItem = require("../getStackOrSingleLevelOrSingleItem");

module.exports =
	({
		identifierOrItemOrLevelOrStack,
		targetLevelOrStack,
	}) =>
		identifierOrItemOrLevelOrStack
		&&
		getStackOrSingleLevelOrSingleItem(
			filterIdentifierOrItemOrLevelOrStack({
				identifierOrItemOrLevelOrStack,
				identifierOrItemPredicate:
					withTargetIdentifiers(
						new Set(
							getIdentifiersInTargetLevelOrStack(
								targetLevelOrStack,
							),
						),
					)
					.isIdentifierOrItemIncluded,
			}),
		);

function withTargetIdentifiers(
	targetIdentifiers,
) {
	return { isIdentifierOrItemIncluded };

	function isIdentifierOrItemIncluded(
		identifierOrItem,
	) {
		return (
			isIdentifierNotInTarget(
				identifierOrItem.id
				||
				identifierOrItem,
			)
		);
	}

	function isIdentifierNotInTarget(
		identifier,
	) {
		return (
			identifier === "existing"
			||
			!targetIdentifiers.has(identifier)
		);
	}
}