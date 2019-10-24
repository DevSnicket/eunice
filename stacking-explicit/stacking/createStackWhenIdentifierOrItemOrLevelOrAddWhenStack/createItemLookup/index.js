// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const
	createForIdentifierOrItem = require("./createForIdentifierOrItem"),
	createForLevelOrStack = require("./createForLevelOrStack");

module.exports =
	identifierOrItemOrLevelOrStack => {
		return (
			whenNoValue()
			||
			whenLevelOrStack()
			||
			createForIdentifierOrItem(identifierOrItemOrLevelOrStack)
		);

		function whenNoValue() {
			return (
				!identifierOrItemOrLevelOrStack
				&&
				{
					getIdentifiersNotUsed: () => null,
					useItem: () => null,
				}
			);
		}

		function whenLevelOrStack() {
			return (
				Array.isArray(identifierOrItemOrLevelOrStack)
				&&
				createForLevelOrStack(identifierOrItemOrLevelOrStack)
			);
		}
	};