// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createDependencyGroupFactoryWhenRequired from "../createDependencyGroupFactoryWhenRequired";

export default ({
	arrows,
	count,
	createTextGroup,
	font,
	keyPrefix,
}) =>
	[
		{
			arrow: arrows.down,
			direction: "below",
		},
		{
			arrow: arrows.up,
			direction: "above",
		},
		{
			arrow: arrows.right,
			direction: "same",
		},
	]
	.flatMap(
		({ arrow, direction }) =>
			createDependencyGroupFactoryWhenRequired({
				arrow,
				count:
					count[direction],
				createTextGroup,
				font,
				key:
					`${keyPrefix}dependency count inner ${direction}`,
			})
			||
			[],
	);