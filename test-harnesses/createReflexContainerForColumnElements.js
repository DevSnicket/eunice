const
	{ createElement } = require("react"),
	{
		ReflexContainer,
		ReflexElement,
		ReflexSplitter,
	} = require("react-reflex");

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