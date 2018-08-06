const
	{ renderToStaticMarkup } = require("react-dom/server"),
	path = require("path");

const
	getInteractiveSvgElementForYaml = require("./getInteractiveSvgElementForYaml"),
	readTextFile = require("../Tests/readTextFile");

test(
	"subset of root item with single child item returns single item",
	() =>
		expect(
			renderToStaticMarkup(
				getInteractiveSvgElementForYaml(
					"single"
				)
			)
		)
		.toEqual(
			readTextFile(
				path.join(__dirname, "getInteractiveSvgElementForYaml.testcases", ".svg")
			)
		)
);