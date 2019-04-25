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
						index.length ? createSplitterWithIndex(index) : null,
						createElement(
							ReflexElement,
							null,
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