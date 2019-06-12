const
	getIdentifierPropertyOrValue = require("../getIdentifierPropertyOrValue"),
	withAncestors = require("./withAncestors");

module.exports =
	({
		ancestor,
		ancestors,
		item,
	}) => {
		return (
			whenHasAncestor()
			||
			whenHasAncestors({
				ancestors,
				item,
			})
			||
			getIdentifierPropertyOrValue(item)
		);

		function whenHasAncestor() {
			return (
				ancestor
				&&
				withAncestors({
					baseAncestor: ancestor,
					item,
				})
			);
		}
	};

function whenHasAncestors({
	ancestors,
	item,
}) {
	return (
		ancestors
		&&
		ancestors.reduce(
			(items, ancestor) => (
				{
					id: getIdentifierPropertyOrValue(ancestor),
					items,
				}
			),
			item,
		)
	);
}