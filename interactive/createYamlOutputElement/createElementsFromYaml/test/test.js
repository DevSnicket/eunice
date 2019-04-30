const
	{ createElement } = require("react"),
	createElementsFromYaml = require("../../createElementsFromYaml"),
	path = require("path"),
	readTestSvgFile = require("./readTestFile"),
	{ renderToStaticMarkup } = require("react-dom/server");

const breadcrumbHtmlForRoot = "<div><a href=\"#\">root</a></div>";

describe(
	"items",
	() => {
		test.each(
			[
				[
					"item without items returns item without breadcrumbs, parent and hyperlinks",
					{
						expectedSvgFile:
							"without parent and hyperlinks",
						yaml:
							"single",
					},
				],
				[
					"item with items returns item with hyperlinks, and without breadcrumbs and parent",
					{
						expectedSvgFile:
							"without parent and with hyperlinks",
						yaml:
							"{ id: single, items: nested }",
					},
				],
				[
					"anonymous item with items returns item with hyperlinks, and without breadcrumbs and parent",
					{
						expectedSvgFile:
							"anonymous without parent and with hyperlinks",
						yaml:
							"{ items: nested }",
					},
				],
				[
					"parent with identifier with child without items and location hash of parent identifier returns breadcrumb of root and child without hyperlink",
					{
						expectedHtmlPrefix:
							breadcrumbHtmlForRoot,
						expectedSvgFile:
							"with parent and without hyperlinks",
						locationHash:
							"#subset-item=parent",
						yaml:
							"{ id: parent, items: single }",
					},
				],
				[
					"anonymous grandparent without identifier, parent with child without items and location hash of undefined and parent returns breadcrumb of root and anonymous, and child without hyperlink",
					{
						expectedHtmlPrefix:
							"<div><a href=\"#\">root</a>: <a href=\"#subset-item=undefined\" style=\"font-style:italic\">anonymous</a></div>",
						expectedSvgFile:
							"with parent and without hyperlinks",
						locationHash:
							"#subset-item=undefined/parent",
						yaml:
							"{ items: { id: parent, items: single } }",
					},
				],
				[
					"parent with identifier with child with items and location hash of parent identifier returns breadcrumb of root and child with hyperlink prefixed with parent identifier",
					{
						expectedHtmlPrefix:
							breadcrumbHtmlForRoot,
						expectedSvgFile:
							"with parent and hyperlinks",
						locationHash:
							"#subset-item=parent",
						yaml:
							"{ id: parent, items: { id: single, items: nested } }",
					},
				],
				[
					"grandparent and parent with identifiers, child with items and location hash of grandparent and parent identifier returns breadcrumb of root and grandparent, and child with hyperlink prefixed with parent identifier",
					{
						expectedHtmlPrefix:
							"<div><a href=\"#\">root</a>: <a href=\"#subset-item=grandparent\">grandparent</a></div>",
						expectedSvgFile:
							"with grandparent and parent and hyperlinks",
						locationHash:
							"#subset-item=grandparent/parent",
						yaml:
							"{ id: grandparent, items: { id: parent, items: { id: single, items: nested } } }",
					},
				],
			],
		)(
			"%s",
			(
				description,
				{
					expectedHtmlPrefix,
					expectedSvgFile,
					locationHash,
					yaml,
				},
			) =>
				testTestCase({
					expectedFile:
						path.join("items", `${expectedSvgFile}.svg`),
					expectedHtmlPrefix,
					locationHash,
					yaml,
				}),
		);

		test(
			"location without hash prefix throws error",
			() =>
				expect(
					() =>
						renderToStaticMarkup(
							createElementsFromYaml({
								createElement,
								locationHash: "no hash prefix",
								yaml: "{}",
							}),
						),
				)
				.toThrowError(
					"Location hash must start with a hash character.",
				),
		);
	},
);

describe(
	"dependency counts",
	() =>
		test.each(
			[
				[
					"first depends upon second",
					{
						expectedSvgFile:
							"first depends upon second",
						yaml:
							"[{ id: first, dependsUpon: second }, second ]",
					},
				],
				[
					"second depends upon first",
					{
						expectedSvgFile:
							"second depends upon first",
						yaml:
							"[ first, { id: second, dependsUpon: first } ]",
					},
				],
				[
					"upper depends upon lower",
					{
						expectedSvgFile:
							"upper depends upon lower",
						yaml:
							"[ [ { id: upper, dependsUpon: lower } ], [ lower ] ]",
					},
				],
				[
					"lower depends upon upper",
					{
						expectedSvgFile:
							"lower depends upon upper",
						yaml:
							"[ [ upper ], [ { id: lower, dependsUpon: upper } ] ]",
					},
				],
			],
		)(
			"%s",
			(
				description,
				{
					expectedSvgFile,
					yaml,
				},
			) =>
				testTestCase({
					expectedFile:
						path.join("dependencyCounts", `${expectedSvgFile}.svg`),
					yaml,
				}),
		),
);

function testTestCase({
	expectedFile,
	expectedHtmlPrefix = "",
	locationHash = null,
	yaml,
}) {
	expect(
		renderToStaticMarkup(
			createElementsFromYaml({
				createElement,
				locationHash,
				yaml,
			}),
		),
	)
	.toEqual(
		wrapInPaddingDiv(
			expectedHtmlPrefix
			+
			readTestSvgFile(
				path.join(__dirname, "testCases", expectedFile),
			),
		),
	);
}

function wrapInPaddingDiv(
	content,
) {
	return `<div style="padding:0.5em">${content}</div>`;
}