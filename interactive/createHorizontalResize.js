// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({
		createElement,
		elements: { left, right },
		resizableElementTypes,
	}) =>
		createElement(
			resizableElementTypes.container,
			{ orientation: "vertical" },
			createElement(
				resizableElementTypes.element,
				{ flex: 0.35 },
				left,
			),
			createElement(
				resizableElementTypes.splitter,
				null,
				createElement("div", null, "|".repeat(3)),
			),
			createElement(
				resizableElementTypes.element,
				{ flex: 0.65 },
				right,
			),
		);