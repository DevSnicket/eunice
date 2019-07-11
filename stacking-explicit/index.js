/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

/* istanbul ignore file: test would be a mirror of implementation */
const
	groupItemsByIdentifierSeparator = require("./groupItemsByIdentifierSeparator"),
	removeRedundantParentIdentifierPrefix = require("./removeRedundantParentIdentifierPrefix"),
	removeSelfDependentItemsOfType = require("./removeSelfDependentItemsOfType"),
	replaceDependsUpon = require("./replaceDependsUpon"),
	replaceDependsUponWithHierarchyFromSeparator = require("./replaceDependsUpon/withHierarchyFromSeparator"),
	replaceIdentifiers = require("./replaceIdentifiers"),
	setIdentifierOfAnonymousToParent = require("./setIdentifierOfAnonymousToParent"),
	setTypeOfRootItems = require("./setTypeOfRootItems"),
	sorting = require("./sorting"),
	stacking = require("./stacking"),
	unstackIndependent = require("./unstackIndependent");

module.exports =
	{
		groupItemsByIdentifierSeparator,
		removeRedundantParentIdentifierPrefix,
		removeSelfDependentItemsOfType,
		replaceDependsUpon,
		replaceDependsUponWithHierarchyFromSeparator,
		replaceIdentifiers,
		setIdentifierOfAnonymousToParent,
		setTypeOfRootItems,
		sorting,
		stacking,
		unstackIndependent,
	};