module.exports =
	({
		createItemAndDependencyGroup,
		items,
		left,
		top,
		withPrecision,
	}) => {
		return (
			items
			.reduce(
				aggregate,
				{ bottom: 0, groups: [], right: left }
			)
		);

		function aggregate(
			aggregation,
			item,
			index
		) {
			const itemLeft = getItemLeft();

			const groupsAndSize =
				createItemAndDependencyGroup({
					item,
					left: itemLeft,
				});

			return (
				{
					bottom: Math.max(aggregation.bottom, top + groupsAndSize.height),
					groups: [ ...aggregation.groups, ...groupsAndSize.groups ],
					right: withPrecision(itemLeft + groupsAndSize.width),
				});

			function getItemLeft() {
				return (
					withPrecision(
						aggregation.right
						+
						(index ? 15 : 0)
					)
				);
			}
		}
	};