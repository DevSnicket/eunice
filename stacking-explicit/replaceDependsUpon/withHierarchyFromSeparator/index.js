// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const
	createDependsUponHierarchy = require("./createDependsUponHierarchy"),
	replaceDependsUpon = require("..");

module.exports =
	({
		identifierSeparator,
		items,
	}) =>
		items
		&&
		replaceDependsUpon({
			getDependsUponReplacement:
				dependsUpon =>
					createDependsUponHierarchy({
						dependsUpon,
						identifierSeparator,
					}),
			identifierOrItemOrLevelOrStack:
				items,
		});