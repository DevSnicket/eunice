const getItemOrCreateItemForGroup = require("./getItemOrCreateItemForGroup");

module.exports =
	aggregation => {
		return (
			aggregation
			&&
			createFromGroup()
		);

		function createFromGroup() {
			return (
				[
					...aggregation.items || [],
					getItemOrCreateItemForGroupAndParents(aggregation.group),
				]
			);
		}
	};

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