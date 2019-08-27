// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports = getItemIdentifierHierarchy;

function getItemIdentifierHierarchy({
	id,
	level: { stack: { parent } },
}) {
	return (
		[
			...getAncestorsWhenHasParent() || [],
			id,
		]
	);

	function getAncestorsWhenHasParent() {
		return (
			parent
			&&
			getItemIdentifierHierarchy(parent)
		);
	}
}