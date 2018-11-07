const
	{ createElement } = require("react"),
	{
		ReflexContainer,
		ReflexSplitter,
	} = require("react-reflex");

module.exports =
	(...columns) =>
		createElement(
			ReflexContainer,
			{ orientation: "vertical" },
			columns
			.reduce(
				(elements, column) =>
					[
						...elements,
						elements.length ? createSplitterWithIndex(elements.length - 1) : null,
						column,
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