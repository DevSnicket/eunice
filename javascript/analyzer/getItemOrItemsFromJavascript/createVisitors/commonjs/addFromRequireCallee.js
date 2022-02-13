/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

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