/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

require("array.prototype.flat")
.shim();

require("array.prototype.flatmap")
.shim();

module.exports =
	({
		ancestors,
		identifier,
	}) => {
		const lastAncestor = ancestors[0];

		return (
			lastAncestor.items
			&&
			withIdentifier(
				identifier,
			)
			.findInItemsAndPermeableDescendants(
				lastAncestor.items.flat(),
			)
		);
	};

function withIdentifier(
	identifier,
) {
	return { findInItemsAndPermeableDescendants };

	function findInItemsAndPermeableDescendants(
		items,
	) {
		return (
			findInItems()
			||
			findInItemsOfPermeable(
				getItemsOfItemsWhenDependencyPermeable(),
			)
		);

		function findInItems() {
			return items.find(item => item.id === identifier);
		}

		function getItemsOfItemsWhenDependencyPermeable() {
			return (
				items.flatMap(
					item =>
						getItemsOfItemWhenDependencyPermeable(item)
						||
						[],
				)
			);
		}
	}

	function getItemsOfItemWhenDependencyPermeable({
		dependencyPermeable,
		items,
	}) {
		return (
			dependencyPermeable
			&&
			items.flat()
		);
	}

	function findInItemsOfPermeable(
		items,
	) {
		return (
			items.length
			&&
			findInItemsAndPermeableDescendants(items)
		);
	}
}