const createSplitterContentWithCreateElement = require("./createSplitterContentWithCreateElement");

module.exports =
	({
		createElement,
		elements: { upper, lower },
		resizableElementTypes,
	}) =>
		createElement(
			resizableElementTypes.container,
			{ orientation: "horizontal" },
			createElement(
				resizableElementTypes.element,
				null,
				upper,
			),
			createElement(
				resizableElementTypes.splitter,
				null,
				createSplitterContentWithCreateElement(
					createElement,
				),
			),
			createElement(
				resizableElementTypes.element,
				null,
				lower,
			),
		);