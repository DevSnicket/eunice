const
	getInteractiveElementsForYaml = require(".."),
	path = require("path"),
	readTestSvgFile = require("./readTestFile"),
	{ renderToStaticMarkup } = require("react-dom/server");

const breadcrumbHtmlForRoot = "<div><a href=\"#\">root</a></div>";

test.each(
	[
		[
			"item without items returns item without breadcrumbs, parent and hyperlinks",
			{
				expectedSvgFile: "items/without-parent-and-hyperlinks",
				yaml: "single",
			},
		],
		[
			"item with items returns item with hyperlinks, and without breadcrumbs and parent",
			{
				expectedSvgFile: "items/without-parent-and-with-hyperlinks",
				yaml: "{ id: single, items: nested }",
			},
		],
		[
			"parent with identifier with child without items and location hash of parent identifier returns breadcrumb of root and child without hyperlink",
			{
				expectedHtmlPrefix: breadcrumbHtmlForRoot,
				expectedSvgFile: "items/with-parent-and-without-hyperlinks",
				locationHash: "#selected=parent",
				yaml: "{ id: parent, items: single }",
			},
		],
		[
			"grandparent without identifier, parent with child without items and location hash of undefined and parent returns breadcrumb of root and anonymous, and child without hyperlink",
			{
				expectedHtmlPrefix: "<div><a href=\"#\">root</a> &gt; <a href=\"#undefined\" style=\"font-style:italic\">anonymous</a></div>",
				expectedSvgFile: "items/with-parent-and-without-hyperlinks",
				locationHash: "#selected=undefined/parent",
				yaml: "{ items: { id: parent, items: single } }",
			},
		],
		[
			"parent with identifier with child with items and location hash of parent identifier returns breadcrumb of root and child with hyperlink prefixed with parent identifier",
			{
				expectedHtmlPrefix: breadcrumbHtmlForRoot,
				expectedSvgFile: "items/with-parent-and-hyperlinks",
				locationHash: "#selected=parent",
				yaml: "{ id: parent, items: { id: single, items: nested } }",
			},
		],
		[
			"grandparent and parent with identifiers, child with items and location hash of grandparent and parent identifier returns breadcrumb of root and grandparent, and child with hyperlink prefixed with parent identifier",
			{
				expectedHtmlPrefix: "<div><a href=\"#\">root</a> &gt; <a href=\"#grandparent\">grandparent</a></div>",
				expectedSvgFile: "items/with-grandparent-and-parent-and-hyperlinks",
				locationHash: "#selected=grandparent/parent",
				yaml: "{ id: grandparent, items: { id: parent, items: { id: single, items: nested } } }",
			},
		],
		[
			"first depends upon second",
			{
				expectedSvgFile: "dependencyCounts/first-depends-upon-second",
				yaml: "[{ id: first, dependsUpon: second }, second ]",
			},
		],
		[
			"second depends upon first",
			{
				expectedSvgFile: "dependencyCounts/second-depends-upon-first",
				yaml: "[ first, { id: second, dependsUpon: first } ]",
			},
		],
		[
			"upper depends upon lower",
			{
				expectedSvgFile: "dependencyCounts/upper-depends-upon-lower",
				yaml: "[ [ { id: upper, dependsUpon: lower } ], [ lower ] ]",
			},
		],
		[
			"lower depends upon upper",
			{
				expectedSvgFile: "dependencyCounts/lower-depends-upon-upper",
				yaml: "[ [ upper ], [ { id: lower, dependsUpon: upper } ] ]",
			},
		],
	],
)(
	"%s",
	(
		description,
		{
			expectedHtmlPrefix = "",
			expectedSvgFile,
			locationHash = null,
			yaml,
		},
	) =>
		expect(
			renderToStaticMarkup(
				getInteractiveElementsForYaml({
					locationHash,
					yaml,
				}),
			),
		)
		.toEqual(
			expectedHtmlPrefix
			+
			readTestSvgFile(
				path.join(__dirname, "testCases", `${expectedSvgFile}.svg`),
			),
		),
);

test(
	"Location hash not starting with hash character throws error.",
	() =>
		expect(
			() =>
				getInteractiveElementsForYaml({
					locationHash: "*",
					yaml: null,
				}),
		)
		.toThrowError(
			"Location hash must start with a hash character.",
		),
);