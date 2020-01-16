// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const findBlockOrIdentifiableParentInAncestors = require("../findBlockOrIdentifiableParentInAncestors");

module.exports =
	({
		addDependsUponIdentifierToParent,
		ancestors,
		callee,
		removeExtensionFromFilePath,
		splitDependsUponIntoPathHierarchy,
	}) =>
		addWhenPathHasValue({
			addDependsUponIdentifierToParent,
			ancestors,
			path:
				getPathWhenRequireCallee(
					callee,
				),
			removeExtensionFromFilePath,
			splitDependsUponIntoPathHierarchy,
		});

function getPathWhenRequireCallee(
	callee,
) {
	return (
		callee.callee
		&&
		callee.callee.name === "require"
		&&
		callee.arguments[0].value
	);
}

function addWhenPathHasValue({
	addDependsUponIdentifierToParent,
	ancestors,
	path,
	removeExtensionFromFilePath,
	splitDependsUponIntoPathHierarchy,
}) {
	if (path)
		addDependsUponIdentifierToParent({
			identifier:
				splitDependsUponIntoPathHierarchy(
					removeExtensionFromFilePath(
						path,
					),
				),
			parent:
				findBlockOrIdentifiableParentInAncestors(
					ancestors,
				),
		});
}