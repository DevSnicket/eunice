// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	createElement,
	id,
	polygon,
	preserveAspectRatio,
}) =>
	createElement(
		"symbol",
		{
			id,
			key: id,
			preserveAspectRatio,
			viewBox: "0,0,1,1",
		},
		polygon,
	);