const
	{ createElement } = require("react"),
	{ renderToStaticMarkup } = require("react-dom/server"),
	createListElement = require("../createListElement"),
	path = require("path"),
	readTestFile = require("../../../test/readTestFile");

test(
	"child items with depends upon",
	() =>
		expect(
			renderToStaticMarkup(
				createListElement({
					createElement,
					relationship:
						"dependsUpon",
					subset:
						{
							item:
								{ id: "item 1" },
							items:
								[
									{
										dependencies:
											[ { id: "dependency 1" } ],
										item:
											{ id: "child 1" },
									},
									{
										dependencies:
											[
												{ id: "dependency 2" },
												{ id: "dependency 3" },
											],
										item:
											{ id: "child 2" },
										items:
											[ { item: { id: "grandchild" } } ],
									},
								],
						},
				}),
			),
		)
		.toEqual(
			getBodyTagContents(
				readTestFile(
					path.join(__dirname, "testCase.html"),
				),
			)
			.replace(/\n|\t/g, ""),
		),
);

function getBodyTagContents(
	html,
) {
	return html.match(/<body>(.*)<\/body>/s)[1];
}