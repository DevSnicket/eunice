const getItemOrCreateItemForGroup = require("../getItemOrCreateItemForGroup");

module.exports =
	({
		aggregation,
		createGroupWithItemInGroup,
		identifierElementsStartsWith,
	}) => {
		return aggregateWhenInAncestorOfGroup(aggregation.group);

		function aggregateWhenInAncestorOfGroup(
			group
		) {
			return (
				group.parent
				&&
				(
					aggregateWhenInGroupParent()
					||
					aggregateWhenInAncestorOfGroup({
						...group.parent,
						lastItemOfGroup:
							{
								identifierElements: group.identifierElements,
								item: getItemOrCreateItemForGroup(group),
							},
					})
				)
			);

			function aggregateWhenInGroupParent(
			) {
				return (
					identifierElementsStartsWith(
						group.parent.identifierElements
					)
					&&
					{
						group:
							createGroupWithItemInGroup({
								...group.parent,
								lastItemOfGroup:
									{
										identifierElements:
											group.identifierElements,
										item:
											getItemOrCreateItemForGroup(group),
									},
							}),
						items:
							aggregation.items,
					}
				);
			}
		}
	};