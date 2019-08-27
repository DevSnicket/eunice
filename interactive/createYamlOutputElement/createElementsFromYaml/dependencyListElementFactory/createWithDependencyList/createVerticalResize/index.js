// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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