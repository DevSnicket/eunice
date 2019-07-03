/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createDependencyElementFactory = require("./createDependencyElementFactory"),
	getItemIdentifierHierarchy = require("./getItemIdentifierHierarchy");

require("./index.css");

module.exports =
	({
		createAncestorSeparatorElement,
		createElement,
		createIdentifierHierarchyAnchor,
		relationship,
		subset,
	}) => {
		return (
			subset
			&&
			createElement(
				"div",
				{ className: `dependency-list ${relationship}` },
				createChildElements(),
			)
		);

		function createChildElements() {
			return (
				withElementFactory({
					createDependencyElements:
						createDependencyElementFactory({
							createAncestorSeparatorElement,
							createIdentifierHierarchyAnchor,
						}).createElements,
					createElement,
					createIdentifierHierarchyAnchor,
				})
				.createElementsForSubset(subset)
			);
		}
	};

function withElementFactory({
	createDependencyElements,
	createElement,
	createIdentifierHierarchyAnchor,
}) {
	return { createElementsForSubset };

	function createElementsForSubset(
		subset,
	) {
		return (
			[
				createIdentifierHierarchyAnchor(
					getItemIdentifierHierarchy(
						subset.item,
					),
				),
				createDependenciesElement(
					subset.dependencies,
				),
				createChildItemsElement(
					subset.items,
				),
			]
		);
	}

	function createDependenciesElement(
		dependencies,
	) {
		return (
			dependencies
			&&
			createElement(
				"ul",
				{
					className: "item-dependencies",
					key: "item-dependencies",
				},
				dependencies.map(
					dependency =>
						createElement(
							"li",
							{ key: dependency.id },
							...createDependencyElements(dependency),
						),
				),
			)
		);
	}

	function createChildItemsElement(
		items,
	) {
		return (
			items
			&&
			createElement(
				"ul",
				{
					className: "child-items",
					key: "child-items",
				},
				items
				.sort(compareItemIdentifiers)
				.map(createChildItemElement),
			)
		);
	}

	function compareItemIdentifiers(
		left,
		right,
	) {
		return left.item.id.localeCompare(right.item.id);
	}

	function createChildItemElement(
		childItem,
	) {
		return (
			createElement(
				"li",
				{ key: childItem.item.id },
				createElementsForSubset(childItem),
			)
		);
	}
}