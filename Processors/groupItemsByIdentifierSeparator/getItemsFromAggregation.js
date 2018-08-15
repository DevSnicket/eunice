const getItemOrCreateItemForGroupAndParents = require("./getItemOrCreateItemForGroupAndParents");

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