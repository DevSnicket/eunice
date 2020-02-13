// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default
(/** @type {import("./Parameter.d")} */{
	source,
	target,
}) =>
	withSource(source)
	.isInner(target);

function withSource(
	source,
) {
	return { isInner };

	function isInner(
		target,
	) {
		return (
			source !== target
			&&
			Boolean(hasAncestorOfSource(target))
		);
	}

	function hasAncestorOfSource(
		{ parent },
	) {
		return (
			parent
			&&
			isSourceOrHasAncestorOfSource(parent.level.stack)
		);
	}

	function isSourceOrHasAncestorOfSource(
		target,
	) {
		return (
			source === target
			||
			hasAncestorOfSource(target)
		);
	}
}