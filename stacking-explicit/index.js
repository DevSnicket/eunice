// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

/* istanbul ignore file: test would be a mirror of implementation */
const
	createLinearHierarchyFromIdentifierSeparator = require("./createLinearHierarchyFromIdentifierSeparator"),
	groupItemsByIdentifierSeparator = require("./groupItemsByIdentifierSeparator"),
	removeRedundantParentIdentifierPrefix = require("./removeRedundantParentIdentifierPrefix"),
	replacement = require("./replacement"),
	setTypeOfRootItems = require("./setTypeOfRootItems"),
	sorting = require("./sorting"),
	stacking = require("./stacking"),
	unstackIndependent = require("./unstackIndependent");

module.exports =
	{
		createLinearHierarchyFromIdentifierSeparator,
		groupItemsByIdentifierSeparator,
		removeRedundantParentIdentifierPrefix,
		replacement,
		setTypeOfRootItems,
		sorting,
		stacking,
		unstackIndependent,
	};