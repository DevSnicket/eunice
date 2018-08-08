const
	{ renderToStaticMarkup } = require("react-dom/server"),
	path = require("path");

const
	getInteractiveElementsForYaml = require("./getInteractiveElementsForYaml"),
	readTextFile = require("../Tests/readTextFile");

test(
	"item without items returns SVG without hyperlink",
	() =>
		expectGetInteractiveElementsForYaml({
			expectedFile: "without-hyperlink",
			locationHash: null,
			yaml: "single",
		})
);

test(
	"item with items returns SVG with hyperlink",
	() =>
		expectGetInteractiveElementsForYaml({
			expectedFile: "with-hyperlink",
			locationHash: null,
			yaml: "{ id: single, items: nested }",
		})
);

const breadcrumbHtmlForParent = "<div><a href=\"#\">root</a> &gt; <a href=\"#parent\">parent</a></div>";

test(
	"parent with identifier with child without items and location hash of parent identifier returns child without hyperlink",
	() =>
		expectGetInteractiveElementsForYaml({
			expectedFile: "without-hyperlink",
			expectedPrefix: breadcrumbHtmlForParent,
			locationHash: "#parent",
			yaml: "{ id: parent, items: single }",
		})
);

test(
	"parent without identifier with child without items and location hash of undefined returns child without hyperlink",
	() =>
		expectGetInteractiveElementsForYaml({
			expectedFile: "without-hyperlink",
			expectedPrefix: "<div><a href=\"#\">root</a> &gt; <a href=\"#undefined\"></a></div>",
			locationHash: "#undefined",
			yaml: "{ items: single }",
		})
);

test(
	"parent with identifier with child with items and location hash of parent identifier returns child with hyperlink prefixed with parent identifier",
	() =>
		expectGetInteractiveElementsForYaml({
			expectedFile: "with-hyperlink-prefixed-with-parent",
			expectedPrefix: breadcrumbHtmlForParent,
			locationHash: "#parent",
			yaml: "{ id: parent, items: { id: single, items: nested } }",
		})
);

function expectGetInteractiveElementsForYaml({
	expectedFile,
	expectedPrefix = "",
	locationHash,
	yaml,
}) {
	expect(
		renderToStaticMarkup(
			getInteractiveElementsForYaml({
				locationHash,
				yaml,
			})
		)
	)
	.toEqual(
		expectedPrefix
		+
		readTextFile(
			path.join(__dirname, "getInteractiveElementsForYaml.testcases", `${expectedFile}.svg`)
		)
	);
}