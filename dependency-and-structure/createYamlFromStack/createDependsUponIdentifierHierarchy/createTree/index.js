// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createAncestorsIterator from "./createAncestorsIterator";
import createParent from "./createParent";
import getIdentifierPropertyOrValue from "../getIdentifierPropertyOrValue";
import iterateAncestorsAndAddOrGetWithParents from "./iterateAncestorsAndAddOrGetWithParents";

export default
dependsUpon => {
	const parent = createParent();

	let dependsUponWithAncestors =
		iterateAncestorsAndAddOrGetWithParents(
			createDependsUponWithAncestorIterator({
				dependsUpon,
				parent,
			}),
		);

	while (dependsUponWithAncestors.length)
		dependsUponWithAncestors = iterateAncestorsAndAddOrGetWithParents(dependsUponWithAncestors);

	return parent.getItems();
};

function createDependsUponWithAncestorIterator({
	dependsUpon,
	parent,
}) {
	return (
		dependsUpon.map(
			dependUpon =>
				({
					identifiers:
						{
							ancestorsIterator:
								createAncestorsIterator(dependUpon.ancestors),
							item:
								getIdentifierPropertyOrValue(dependUpon.item),
						},
					parent,
				}),
		)
	);
}