// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import borderThickness from "./borderThickness";

export default ({
	createInnerDependencyGroupFactoryFromItem,
	parent,
}) => {
	return (
		hasItemsOfMultiple(parent)
		&&
		addTopOffset(
			createInnerDependencyGroupFactoryFromItem({
				item:
					parent,
				keyPrefix:
					`parent ${parent.identifier}`,
			}),
		)
	);

	function addTopOffset(
		dependencyGroupFactory,
	) {
		return (
			dependencyGroupFactory
			&&
			{
				...dependencyGroupFactory,
				height:
					dependencyGroupFactory.height
					+
					borderThickness,
			}
		);
	}
};

function hasItemsOfMultiple(
	{ items: stack },
) {
	return (
		stack
		&&
		hasMultipleItems()
	);

	function hasMultipleItems() {
		return (
			hasMultipleLevels()
			||
			hasSingleLevelOfMultipleItems()
		);

		function hasMultipleLevels() {
			return stack.length > 1;
		}

		function hasSingleLevelOfMultipleItems() {
			return (
				stack.length === 1
				&&
				stack[0].length > 1
			);
		}
	}
}