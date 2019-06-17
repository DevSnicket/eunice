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