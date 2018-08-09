const
	{ renderToStaticMarkup } = require("react-dom/server"),
	path = require("path");

const
	getInteractiveElementsForYaml = require("./getInteractiveElementsForYaml"),
	readTextFile = require("../Tests/readTextFile");

test(
	"item without items returns item without breadcrumbs, parent and hyperlinks",
	() =>
		expectGetInteractiveElementsForYaml({
			expectedSvgFile: "without-parent-and-hyperlinks",
			locationHash: null,
			yaml: "single",
		})
);

test(
	"item with items returns item with hyperlinks, and without breadcrumbs and parent",
	() =>
		expectGetInteractiveElementsForYaml({
			expectedSvgFile: "without-parent-and-with-hyperlinks",
			locationHash: null,
			yaml: "{ id: single, items: nested }",
		})
);

const breadcrumbHtmlForRoot = "<div><a href=\"#\">root</a></div>";

test(
	"parent with identifier with child without items and location hash of parent identifier returns breadcrumb of root and child without hyperlink",
	() =>
		expectGetInteractiveElementsForYaml({
			expectedHtmlPrefix: breadcrumbHtmlForRoot,
			expectedSvgFile: "with-parent-and-without-hyperlinks",
			locationHash: "#parent",
			yaml: "{ id: parent, items: single }",
		})
);

test(
	"grandparent without identifier, parent with child without items and location hash of undefined and parent returns breadcrumb of root and anonymous, and child without hyperlink",
	() =>
		expectGetInteractiveElementsForYaml({
			expectedHtmlPrefix: "<div><a href=\"#\">root</a> &gt; <a href=\"#undefined\" style=\"font-style:italic\">anonymous</a></div>",
			expectedSvgFile: "with-parent-and-without-hyperlinks",
			locationHash: "#undefined/parent",
			yaml: "{ items: { id: parent, items: single } }",
		})
);

test(
	"parent with identifier with child with items and location hash of parent identifier returns breadcrumb of root and child with hyperlink prefixed with parent identifier",
	() =>
		expectGetInteractiveElementsForYaml({
			expectedHtmlPrefix: breadcrumbHtmlForRoot,
			expectedSvgFile: "with-parent-and-hyperlinks",
			locationHash: "#parent",
			yaml: "{ id: parent, items: { id: single, items: nested } }",
		})
);

test(
	"grandparent and parent with identifiers, child with items and location hash of grandparent and parent identifier returns breadcrumb of root and grandparent, and child with hyperlink prefixed with parent identifier",
	() =>
		expectGetInteractiveElementsForYaml({
			expectedHtmlPrefix: "<div><a href=\"#\">root</a> &gt; <a href=\"#grandparent\">grandparent</a></div>",
			expectedSvgFile: "with-grandparent-and-parent-and-hyperlinks",
			locationHash: "#grandparent/parent",
			yaml: "{ id: grandparent, items: { id: parent, items: { id: single, items: nested } } }",
		})
);

function expectGetInteractiveElementsForYaml({
	expectedHtmlPrefix = "",
	expectedSvgFile,
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
		expectedHtmlPrefix
		+
		readTextFile(
			path.join(__dirname, "getInteractiveElementsForYaml.testcases", `${expectedSvgFile}.svg`)
		)
	);
}