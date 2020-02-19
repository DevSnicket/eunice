// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	center,
	groupFactories,
	spacing,
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
							groupFactory.createAtPosition({ left: aggregation.left, top }),
						],
					left:
						aggregation.left + groupFactory.width + spacing,
				}
			),
			{ groups: [], left: calculateLeft() },
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
				0,
			)
		);
	}
};