/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createStackWhenIdentifierOrItemOrLevelOrAddWhenStack = require("../createStackWhenIdentifierOrItemOrLevelOrAddWhenStack"),
	getIdentifiersInNewStackWhenParentAncestor = require("./getIdentifiersInNewStackWhenParentAncestor"),
	replaceItemsAndInItems = require("../replaceItemsAndInItems");

module.exports =
	({
		identifierPattern,
		identifiersInNewStack,
		items,
	}) =>
		replaceItemsAndInItems({
			identifierOrItemOrLevelOrStack:
				items,
			replace:
				({
					ancestors,
					identifierOrItemOrLevelOrStack,
				}) =>
					createStackWhenIdentifierOrItemOrLevelOrAddWhenStack({
						addMissing:
							true,
						identifierOrItemOrLevelOrStack,
						identifiersInNewStack:
							getIdentifiersInNewStackWhenParentAncestor({
								ancestors,
								identifiersInNewStack,
								parentIdentifierPattern: identifierPattern,
							}),
					}),
		});