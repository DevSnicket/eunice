/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	{ createElement } = require("react"),
	{
		ReflexContainer,
		ReflexElement,
		ReflexSplitter,
	} = require("react-reflex");

require("react-reflex/styles.css");
require("./index.css");

module.exports =
	elements =>
		createElement(
			ReflexContainer,
			{ orientation: "vertical" },
			elements
			.reduce(
				(columns, column, index) =>
					[
						...columns,
						index > 0 ? createSplitterWithIndex(index - 1) : null,
						createElement(
							ReflexElement,
							{ key: `element ${index}` },
							column,
						),
					],
				[],
			),
		);

function createSplitterWithIndex(
	index,
) {
	return (
		createElement(
			ReflexSplitter,
			{ key: `splitter ${index}` },
			createElement("div", null, "|".repeat(3)),
		)
	);
}