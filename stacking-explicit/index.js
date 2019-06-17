/* istanbul ignore file: test would be a mirror of implementation */
const
	concatenateFromFileSystem = require("./concatenateFromFileSystem"),
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
		concatenateFromFileSystem,
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