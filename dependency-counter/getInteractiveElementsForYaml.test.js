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

const breadcrumbHtmlForRootAndParent = "<div><a href=\"#\">root</a> &gt; parent</div>";

test(
	"parent with identifier with child without items and location hash of parent identifier returns breadcrumb of root and parent, and child without hyperlink",
	() =>
		expectGetInteractiveElementsForYaml({
			expectedFile: "without-hyperlink",
			expectedPrefix: breadcrumbHtmlForRootAndParent,
			locationHash: "#parent",
			yaml: "{ id: parent, items: single }",
		})
);

test(
	"parent without identifier with child without items and location hash of undefined returns breadcrumb of root and child without hyperlink",
	() =>
		expectGetInteractiveElementsForYaml({
			expectedFile: "without-hyperlink",
			expectedPrefix: "<div><a href=\"#\">root</a> &gt; <span style=\"font-style:italic\">anonymous</span></div>",
			locationHash: "#undefined",
			yaml: "{ items: single }",
		})
);

test(
	"parent with identifier with child with items and location hash of parent identifier returns breadcrumb of root and parent, and child with hyperlink prefixed with parent identifier",
	() =>
		expectGetInteractiveElementsForYaml({
			expectedFile: "with-hyperlink-prefixed-with-parent",
			expectedPrefix: breadcrumbHtmlForRootAndParent,
			locationHash: "#parent",
			yaml: "{ id: parent, items: { id: single, items: nested } }",
		})
);

test(
	"grandparent and parent with identifiers with child with items and location hash of grandparent and parent identifier returns breadcrumb of root, grandparent and parent, and child with hyperlink prefixed with parent identifier",
	() =>
		expectGetInteractiveElementsForYaml({
			expectedFile: "with-hyperlink-prefixed-with-grandparent-and-parent",
			expectedPrefix: "<div><a href=\"#\">root</a> &gt; <a href=\"#grandparent\">grandparent</a> &gt; parent</div>",
			locationHash: "#grandparent/parent",
			yaml: "{ id: grandparent, items: { id: parent, items: { id: single, items: nested } } }",
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