// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	addDependsUponIdentifierToParent,
	ancestors,
	callee,
	createPathBasedDependsUpon,
	findBlockOrIdentifiableParentInAncestors,
}) =>
	addWhenPathHasValue({
		addDependsUponIdentifierToParent,
		ancestors,
		createPathBasedDependsUpon,
		findBlockOrIdentifiableParentInAncestors,
		path:
			getPathWhenRequireCallee(
				callee,
			),
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
	findBlockOrIdentifiableParentInAncestors,
	path,
}) {
	if (path)
		addDependsUponIdentifierToParent({
			identifier:
				createPathBasedDependsUpon({
					items:
						null,
					path,
				}),
			parent:
				findBlockOrIdentifiableParentInAncestors(
					ancestors,
				),
		});
}