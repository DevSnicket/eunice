/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import "./index.css";

import createDependencyElementFactory from "./createDependencyElementFactory";
import getItemIdentifierHierarchy from "./getItemIdentifierHierarchy";

export default ({
	closeHref,
	createAncestorSeparatorElement,
	createElement,
	getHrefWithIdentifierHierarchy,
	relationship,
	subset,
}) => {
	return (
		subset
		&&
		createElement(
			"div",
			{ className: `dependency-list ${relationship}` },
			[
				createElement(
					"a",
					{
						href: closeHref,
						id: "close",
						key: "close",
					},
					"\u00D7",
				),
				createElement(
					"div",
					{ key: "body" },
					createChildElements(),
				),
			],
		)
	);

	function createChildElements() {
		return (
			withElementFactory({
				createDependencyElements:
					createDependencyElementFactory({
						createAncestorSeparatorElement,
						createItemInIdentifierHierarchyElement,
					}).createElements,
				createElement,
				createItemInIdentifierHierarchyElement,
			})
			.createElementsForSubset(subset)
		);
	}

	function createItemInIdentifierHierarchyElement({
		identifierHierarchy,
		item: { id, items },
	}) {
		return whenHasItems() || id;

		function whenHasItems() {
			return (
				items
				&&
				createElement(
					"a",
					{
						href: getHrefWithIdentifierHierarchy(identifierHierarchy),
						key: id,
					},
					id,
				)
			);
		}
	}
};

function withElementFactory({
	createDependencyElements,
	createElement,
	createItemInIdentifierHierarchyElement,
}) {
	return { createElementsForSubset };

	function createElementsForSubset(
		subset,
	) {
		return (
			[
				createItemInIdentifierHierarchyElement({
					identifierHierarchy:
						getItemIdentifierHierarchy(
							subset.item,
						),
					item:
						subset.item,
				}),
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
							getKeyPropertyForItem(dependency),
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

	function createChildItemElement(
		childItem,
	) {
		return (
			createElement(
				"li",
				getKeyPropertyForItem(childItem.item),
				createElementsForSubset(childItem),
			)
		);
	}

	function getKeyPropertyForItem(
		item,
	) {
		return { key: getKey() };

		function getKey() {
			return (
				getItemIdentifierHierarchy(item)
				.join("/")
			);
		}
	}
}

function compareItemIdentifiers(
	left,
	right,
) {
	return (
		getItemIdentifierForCompare(left)
		.localeCompare(
			getItemIdentifierForCompare(right),
		)
	);
}

function getItemIdentifierForCompare(
	{ item: { id } },
) {
	return id || "";
}