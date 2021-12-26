// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createDependsUponIdentifierHierarchy from "./createDependsUponIdentifierHierarchy";

export default createYamlFromStack;

/**
  * @param {import("../Stack.d")} stack
  * @returns {import("../Yaml.d")}
  */
function createYamlFromStack(
	stack,
) {
	return (
		whenSingleLevelOrItem()
		||
		stack.map(createFromLevel)
	);

	function whenSingleLevelOrItem() {
		return (
			stack.length === 1
			&&
			createFromLevel(stack[0])
		);
	}

	function createFromLevel(
		level,
	) {
		return (
			whenSingleItem()
			||
			level.map(createFromItem)
		);

		function whenSingleItem() {
			return (
				stack.length === 1
				&&
				level.length === 1
				&&
				createFromItem(level[0])
			);
		}
	}
}

function createFromItem({
	// parameter specified, but not used to remove it from the rest property
	// eslint-disable-next-line no-unused-vars
	dependents,
	dependsUpon,
	id: identifier,
	items,
	// parameter specified, but not used to remove it from the rest property
	// eslint-disable-next-line no-unused-vars
	level,
	...restOfItem
}) {
	const
		dependsUponProperty =
			createDependsUponProperty(
				dependsUpon,
			),
		itemsProperty =
			createItemsProperty(
				items,
			);

	return (
		whenStructured()
		||
		identifier
		||
		{}
	);

	function whenStructured() {
		return (
			(dependsUponProperty || itemsProperty || Object.keys(restOfItem).length)
			&&
			{
				...identifier && { id: identifier },
				...restOfItem,
				...dependsUponProperty,
				...itemsProperty,
			}
		);
	}
}

function createDependsUponProperty(
	dependsUpon,
) {
	return (
		dependsUpon
		&&
		{ dependsUpon: createDependsUponIdentifierHierarchy(dependsUpon) }
	);
}

function createItemsProperty(
	items,
) {
	return (
		items
		&&
		{ items: createYamlFromStack(items) }
	);
}