// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

export default ({
	ancestors,
	keysAndPatterns,
}) =>
	Boolean(
		allMatchParent({
			keysAndPatterns,
			parent: getParentFromAncestors(ancestors),
		}),
	);

function getParentFromAncestors(
	ancestors,
) {
	return (
		ancestors.length
		&&
		ancestors[ancestors.length - 1]
	);
}

function allMatchParent({
	keysAndPatterns,
	parent,
}) {
	return (
		keysAndPatterns.every(
			({ key, pattern }) =>
				isMatch({
					pattern,
					value: parent[key],
				}),
		)
	);
}

function isMatch({
	pattern,
	value,
}) {
	return (
		value
		&&
		value.match(pattern)
	);
}