// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

require("array.prototype.flat")
.shim();

require("array.prototype.flatmap")
.shim();

module.exports =
	({
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
					return getDependents(item.dependents);
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

	function getDependents(
		dependents,
	) {
		return (
			dependents
			&&
			dependents.filter(isDependencyRelevant)
		);
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

	function getDependUponItems(
		{ itemOrFirstAncestorItem },
	) {
		return whenHasValue() || [];

		function whenHasValue() {
			return (
				itemOrFirstAncestorItem
				&&
				isDependencyRelevant(itemOrFirstAncestorItem)
				&&
				itemOrFirstAncestorItem
			);
		}
	}
}