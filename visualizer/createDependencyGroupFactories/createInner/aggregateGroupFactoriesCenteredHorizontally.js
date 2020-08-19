// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import spacing from "../spacing";

export default
groupFactories => {
	return {
		createAtPosition,
		...calculateSize(),
	};

	function calculateSize() {
		return (
			groupFactories.reduce(
				(
					size,
					groupFactory,
				) => (
					{
						height:
							Math.max(
								size.height,
								groupFactory.height,
							),
						width:
							size.width
							+
							(size.width && spacing)
							+
							groupFactory.width,
					}
				),
				{ height: 0, width: 0 },
			)
		);
	}

	function createAtPosition({
		left,
		top,
	}) {
		return (
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
			return left - (sumWidth() / 2);
		}

		function sumWidth() {
			return (
				groupFactories.reduce(
					(sum, groupFactory) => sum + groupFactory.width,
					0,
				)
			);
		}
	}
};