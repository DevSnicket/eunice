/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import { isInnerStack } from "../../../dependency-and-structure";

export default
item =>
	withAncestorStack(
		item.level.stack,
	)
	.createDependencyCountsFromItem(
		item,
	);

function withAncestorStack(
	sourceStack,
) {
	return { createDependencyCountsFromItem };

	function * createDependencyCountsFromItem({
		dependents,
		dependsUpon,
		items,
	}) {
		yield* fromDependents(dependents);
		yield* fromDependsUpon(dependsUpon);
		yield* fromItems(items);
	}

	function * fromDependents(
		dependents,
	) {
		if (dependents)
			for (const dependent of dependents)
				yield* fromDependent(dependent);
	}

	function * fromDependent({
		direction,
		mutualStack,
	}) {
		if (mutualStack && !isDescendantStack(mutualStack))
			yield (
				createDependencyCountOfOneAncestor({
					direction,
					isSourceStack:
						mutualStack === sourceStack,
					relationship:
						"dependents",
				})
			);
	}

	function * fromDependsUpon(
		dependsUpon,
	) {
		if (dependsUpon)
			for (const dependUpon of dependsUpon)
				yield* fromDependUpon(dependUpon);
	}

	function * fromDependUpon({
		direction,
		mutualStack,
	}) {
		if (mutualStack)
			yield (
				whenDescendant()
				||
				createDependencyCountOfOneAncestor({
					direction,
					isSourceStack:
						mutualStack === sourceStack,
					relationship:
						"dependsUpon",
				})
			);

		function whenDescendant() {
			return (
				isDescendantStack(mutualStack)
				&&
				{ descendants: { [direction]: 1 } }
			);
		}
	}

	function isDescendantStack(
		stack,
	) {
		return (
			isInnerStack({
				source: sourceStack,
				target: stack,
			})
		);
	}

	function * fromItems(
		items,
	) {
		if (items)
			for (const level of items)
				for (const item of level)
					yield* createDependencyCountsFromItem(item);
	}
}

function createDependencyCountOfOneAncestor({
	direction,
	isSourceStack,
	relationship,
}) {
	return { [getAncestorKey()]: createAncestor() };

	function getAncestorKey() {
		return whenSourceStack() || "ancestors";

		function whenSourceStack() {
			return (
				isSourceStack
				&&
				"parent"
			);
		}
	}

	function createAncestor() {
		return { [direction]: { [relationship]: 1 } };
	}
}