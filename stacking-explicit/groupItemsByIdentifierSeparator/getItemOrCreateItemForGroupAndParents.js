const getItemOrCreateItemForGroup = require("./getItemOrCreateItemForGroup");

module.exports = getItemOrCreateItemForGroupAndParents;

function getItemOrCreateItemForGroupAndParents(
	group
) {
	return (
		group.parent
		?
		getItemOrCreateItemForGroupAndParents({
			...group.parent,
			lastItemOfGroup: { item: getItemOrCreateItemForGroup(group) },
		})
		:
		getItemOrCreateItemForGroup(group)
	);
}