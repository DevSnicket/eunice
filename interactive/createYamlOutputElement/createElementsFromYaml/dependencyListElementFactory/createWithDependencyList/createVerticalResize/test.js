const
	createVerticalResize = require("."),
	{ createElement } = require("react"),
	{ renderToStaticMarkup } = require("react-dom/server"),
	path = require("path"),
	readTextFile = require("../../../../../readTextFile"),
	removeWhitespaceFromTestExpected = require("../removeWhitespaceFromTestExpected");

test(
	"creates and includes elements",
	async() =>
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
			removeWhitespaceFromTestExpected(
				await readTextFile(
					path.join(__dirname, "testCase.html"),
				),
			),
		),
);