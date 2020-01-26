// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createIndexDependsUponWhenDirectory = require("./createIndexDependsUponWhenDirectory"),
	findBlockOrIdentifiableParentInAncestors = require("../findBlockOrIdentifiableParentInAncestors");

module.exports =
	({
		addDependsUponIdentifierToParent,
		ancestors,
		callee,
		createPathBasedDependsUpon,
		directoryAbsolutePath,
		removeExtensionFromFilePath,
	}) =>
		addWhenPathHasValue({
			addDependsUponIdentifierToParent,
			ancestors,
			createPathBasedDependsUpon,
			directoryAbsolutePath,
			path:
				getPathWhenRequireCallee(
					callee,
				),
			removeExtensionFromFilePath,
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
	createPathBasedDependsUpon,
	directoryAbsolutePath,
	path,
	removeExtensionFromFilePath,
}) {
	if (path)
		addDependsUponIdentifierToParent({
			identifier:
				createPathBasedDependsUpon({
					items:
						createIndexDependsUponWhenDirectory({
							directoryAbsolutePath,
							fileOrDirectoryPath:
								path,
							items:
								null,
						}),
					path:
						removeExtensionFromFilePath(path),
				}),
			parent:
				findBlockOrIdentifiableParentInAncestors(
					ancestors,
				),
		});
}