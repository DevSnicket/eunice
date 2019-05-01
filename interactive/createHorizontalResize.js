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