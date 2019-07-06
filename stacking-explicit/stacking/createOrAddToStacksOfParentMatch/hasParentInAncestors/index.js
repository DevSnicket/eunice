/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
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