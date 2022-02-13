/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export default ({
	findDirectionBetweenItemsInMutualStack,
	stack,
}) =>
	withFindDirectionBetweenItemsInMutualStack(
		findDirectionBetweenItemsInMutualStack,
	)
	.inStack(
		stack,
	);

function withFindDirectionBetweenItemsInMutualStack(
	findDirectionBetweenItemsInMutualStack,
) {
	return { inStack };

	function inStack(
		stack,
	) {
		for (const level of stack)
			for (const item of level) {
				inItem(item);

				if (item.items)
					inStack(item.items);
			}
	}

	function inItem(
		item,
	) {
		return (
			withFindDependencyDirectionInMutualStack(
				dependency =>
					findDirectionBetweenItemsInMutualStack({
						from: item,
						to: dependency,
					}),
			)
			.inDependencies(item)
		);
	}
}

function withFindDependencyDirectionInMutualStack(
	findDependencyDirectionInMutualStack,
) {
	return { inDependencies };

	function inDependencies({
		dependents,
		dependsUpon,
	}) {
		inDependents(dependents);
		inDependsUpon(dependsUpon);
	}

	function inDependents(
		dependents,
	) {
		if (dependents)
			for (const dependent of dependents)
				inDependent(dependent);
	}

	function inDependent(
		dependent,
	) {
		setDirectionAndMutualStackInDependency({
			dependency:
				dependent,
			...findDependencyDirectionInMutualStack(
				dependent.item,
			),
		});
	}

	function inDependsUpon(
		dependsUpon,
	) {
		if (dependsUpon)
			for (const dependUpon of dependsUpon)
				inDependUpon(dependUpon);
	}

	function inDependUpon(
		dependUpon,
	) {
		if (dependUpon.itemOrFirstAncestorItem)
			setDirectionAndMutualStackInDependency({
				dependency:
					dependUpon,
				...findDependencyDirectionInMutualStack(
					dependUpon.itemOrFirstAncestorItem,
				),
			});
	}
}

function setDirectionAndMutualStackInDependency({
	dependency,
	direction,
	mutualStack,
}) {
	dependency.direction = direction;
	dependency.mutualStack = mutualStack;
}