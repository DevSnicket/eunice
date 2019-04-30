const createSplitterContentWithCreateElement = require("./createSplitterContentWithCreateElement");

module.exports =
	({
		createElement,
		elements,
		resizableElementTypes,
	}) =>
		createElement(
			resizableElementTypes.container,
			{ orientation: "horizontal" },
			createElement(
				resizableElementTypes.element,
				null,
				elements.upper,
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
				elements.lower,
			),
		);