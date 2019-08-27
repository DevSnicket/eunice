// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({
		createElement,
		elements,
		size: { height, width },
	}) =>
		createElement(
			"svg",
			{
				height,
				width,
				xmlns: "http://www.w3.org/2000/svg",
			},
			elements,
		);