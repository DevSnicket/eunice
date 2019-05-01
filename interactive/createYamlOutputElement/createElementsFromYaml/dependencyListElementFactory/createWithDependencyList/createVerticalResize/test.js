const
	createVerticalResize = require("."),
	{ createElement } = require("react"),
	{ renderToStaticMarkup } = require("react-dom/server"),
	path = require("path"),
	readTestFile = require("../../../test/readTestFile");

test(
	"creates and includes elements",
	() =>
		expect(
			renderToStaticMarkup(
				createVerticalResize({
					createElement,
					elements:
						{
							lower: "lower",
							upper: "upper",
						},
					resizableElementTypes:
						{
							container: "container",
							element: "element",
							splitter: "splitter",
						},
				}),
			),
		)
		.toEqual(
			readTestFile(
				path.join(__dirname, "testCase.html"),
			)
			.replace(/\n|\t/g, ""),
		),
);