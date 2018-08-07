const
	{ renderToStaticMarkup } = require("react-dom/server"),
	path = require("path");

const
	getInteractiveSvgElementForYaml = require("./getInteractiveSvgElementForYaml"),
	readTextFile = require("../Tests/readTextFile");

test(
	"item without items returns SVG without hyperlink",
	() =>
		expectGetInteractiveSvgElementForYamlToEqualFile({
			expectedFile: "without-hyperlink",
			locationHash: null,
			yaml: "single",
		})
);

test(
	"item with items returns SVG with hyperlink",
	() =>
		expectGetInteractiveSvgElementForYamlToEqualFile({
			expectedFile: "with-hyperlink",
			locationHash: null,
			yaml: "{ id: single, items: nested }",
		})
);

test(
	"parent with identifier with child without items and location hash of parent identifier returns child without hyperlink",
	() =>
		expectGetInteractiveSvgElementForYamlToEqualFile({
			expectedFile: "without-hyperlink",
			locationHash: "#parent",
			yaml: "{ id: parent, items: single }",
		})
);

test(
	"parent without identifier with child without items and location hash of undefined returns child without hyperlink",
	() =>
		expectGetInteractiveSvgElementForYamlToEqualFile({
			expectedFile: "without-hyperlink",
			locationHash: "#undefined",
			yaml: "{ items: single }",
		})
);

test(
	"parent with identifier with child with items and location hash of parent identifier returns child with hyperlink prefixed with parent identifier",
	() =>
		expectGetInteractiveSvgElementForYamlToEqualFile({
			expectedFile: "with-hyperlink-prefixed-with-parent",
			locationHash: "#parent",
			yaml: "{ id: parent, items: { id: single, items: nested } }",
		})
);

function expectGetInteractiveSvgElementForYamlToEqualFile({
	expectedFile,
	locationHash,
	yaml,
}) {
	expect(
		renderToStaticMarkup(
			getInteractiveSvgElementForYaml({
				locationHash,
				yaml,
			})
		)
	)
	.toEqual(
		readTextFile(
			path.join(__dirname, "getInteractiveSvgElementForYaml.testcases", `${expectedFile}.svg`)
		)
	);
}