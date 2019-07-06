/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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