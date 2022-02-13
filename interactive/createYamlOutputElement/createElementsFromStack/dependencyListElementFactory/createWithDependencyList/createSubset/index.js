/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import "core-js/features/array/flat";
import "core-js/features/array/flat-map";

export default ({
	isDependencyRelevant,
	item,
	relationship,
}) =>
	withSubsetCriteriaOf({
		isDependencyRelevant,
		relationship,
	})
	.createForItem(
		item,
	)
	||
	null;

function withSubsetCriteriaOf({
	isDependencyRelevant,
	relationship,
}) {
	return { createForItem };

	function createForItem(
		item,
	) {
		return (
			createWhenRelevant({
				dependencies: getDependencies(),
				items: createForChildItems(),
			})
		);

		function getDependencies() {
			switch (relationship) {
				case "dependents":
					return getDependentsItems(item.dependents);
				case "dependsUpon":
					return getDependsUponItems(item.dependsUpon);
				default:
					throw new Error(`Unexpected relationship of "${relationship}".`);
			}
		}

		function createForChildItems() {
			return (
				item.items
				&&
				item.items
				.flat()
				.map(createForItem)
				.filter(subset => subset)
			);
		}

		function createWhenRelevant({
			dependencies,
			items,
		}) {
			const
				hasDependencies = dependencies && dependencies.length,
				hasItems = items && items.length;

			return (
				(hasDependencies || hasItems)
				&&
				{
					...hasDependencies && { dependencies },
					item,
					...hasItems && { items },
				}
			);
		}
	}

	function getDependentsItems(
		dependents,
	) {
		return (
			dependents
			&&
			dependents.flatMap(getDependentItems)
		);
	}

	function getDependentItems(
		dependent,
	) {
		return whenRelevant() || [];

		function whenRelevant() {
			return (
				isDependencyRelevant(dependent)
				&&
				dependent.item
			);
		}
	}

	function getDependsUponItems(
		dependsUpon,
	) {
		return (
			dependsUpon
			&&
			dependsUpon.flatMap(getDependUponItems)
		);
	}

	function getDependUponItems({
		direction,
		itemOrFirstAncestorItem,
		mutualStack,
	}) {
		return whenRelevant() || [];

		function whenRelevant() {
			return (
				itemOrFirstAncestorItem
				&&
				isDependencyRelevant({
					direction,
					item:
						itemOrFirstAncestorItem,
					mutualStack,
				})
				&&
				itemOrFirstAncestorItem
			);
		}
	}
}