// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const
	createForLevelOrStack = require("./createForLevelOrStack"),
	createForSingle = require("./createForSingle");

module.exports =
	identifierOrItemOrLevelOrStack => {
		return (
			whenNoValue()
			||
			whenLevelOrStack()
			||
			whenItem()
			||
			createForSingle({
				identifier: identifierOrItemOrLevelOrStack,
				item: identifierOrItemOrLevelOrStack,
			})
		);

		function whenNoValue() {
			return (
				!identifierOrItemOrLevelOrStack
				&&
				{
					getIdentifiersNotUsed: () => null,
					// identifier parameter intentionally ignored as there are no items
					// eslint-disable-next-line no-unused-vars
					getItemWithIdentifier: identifier => null,
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

		function whenItem() {
			return (
				identifierOrItemOrLevelOrStack.id
				&&
				createForSingle({
					identifier: identifierOrItemOrLevelOrStack.id,
					item: identifierOrItemOrLevelOrStack,
				})
			);
		}
	};