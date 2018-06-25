module.exports =
	({
		center,
		groupFactories,
		top,
	}) => {
		return (
			groupFactories
			&&
			groupFactories
			.reduce(
				(aggregation, groupFactory) => (
					{
						groups:
							[
								...aggregation.groups,
								groupFactory.create({ left: aggregation.left, top }),
							],
						left:
							aggregation.left + groupFactory.width + 4,
					}
				),
				{ groups: [], left: calculateLeft() }
			)
			.groups
		);

		function calculateLeft() {
			return center - (sumWidth() / 2);
		}

		function sumWidth() {
			return (
				groupFactories.reduce(
					(sum, groupFactory) => sum + groupFactory.width,
					0
				)
			);
		}
	};