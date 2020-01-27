// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createAncestorsIterator = require("./createAncestorsIterator"),
	createParent = require("./createParent"),
	getIdentifierPropertyOrValue = require("../getIdentifierPropertyOrValue"),
	iterateAncestorsAndAddOrGetWithParents = require("./iterateAncestorsAndAddOrGetWithParents");

module.exports =
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