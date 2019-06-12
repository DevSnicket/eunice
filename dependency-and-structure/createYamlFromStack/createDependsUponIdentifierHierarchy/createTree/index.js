const
	createAncestorIterator = require("./createAncestorIterator"),
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
							ancestorIterator:
								createAncestorIterator(dependUpon),
							item:
								getIdentifierPropertyOrValue(dependUpon.item),
						},
					parent,
				}),
		)
	);
}