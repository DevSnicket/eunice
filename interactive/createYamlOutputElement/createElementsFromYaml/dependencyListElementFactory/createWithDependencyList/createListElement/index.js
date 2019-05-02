const createDependencyElementFactory = require("./createDependencyElementFactory");

module.exports =
	({
		createAncestorSeparatorElement,
		createElement,
		createItemAnchor,
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
							createItemAnchor,
						}).createElements,
					createElement,
				})
				.createElementsForSubset(subset)
			);
		}
	};

function withElementFactory({
	createDependencyElements,
	createElement,
}) {
	return { createElementsForSubset };

	function createElementsForSubset(
		subset,
	) {
		return (
			[
				subset.item.id,
				createDependenciesElement(subset.dependencies),
				createChildItemsElement(subset.items),
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