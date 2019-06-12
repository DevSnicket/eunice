const getIdentifierPropertyOrValue = require("../getIdentifierPropertyOrValue");

module.exports =
	({
		baseAncestor,
		item,
	}) =>
		withBaseAncestor(baseAncestor)
		.createWithAncestors({
			ancestor: item.level.stack.parent,
			items: getIdentifierPropertyOrValue(item),
		});

function withBaseAncestor(
	baseAncestor,
) {
	return { createWithAncestors };

	function createWithAncestors({
		ancestor,
		items,
	}) {
		const dependsUpon =
			{
				id: getIdentifierPropertyOrValue(ancestor),
				items,
			};

		return (
			ancestor === baseAncestor
			?
			dependsUpon
			:
			createWithAncestors({
				ancestor: ancestor.level.stack.parent,
				items: dependsUpon,
			})
		);
	}
}