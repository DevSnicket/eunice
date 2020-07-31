// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { createElement } from "react";
import createElementsFromStack from "../..";
import { createHashFromLocation } from "@devsnicket/eunice-test-harnesses";
import path from "path";
import testTestCase from "../testTestCase";

const breadcrumbHtmlForRoot = "<div><a href=\"#\">root</a></div>";

test.each(
	[
		[
			"item without items returns item without breadcrumbs, parent and hyperlinks",
			{
				expectedHtmlPrefix: "",
				expectedSvgFile: "without parent and hyperlinks",
				locationHash: null,
				yaml: "single",
			},
		],
		[
			"item with items returns item with hyperlinks, and without breadcrumbs and parent",
			{
				expectedHtmlPrefix: "",
				expectedSvgFile: "without parent and with hyperlinks",
				locationHash: null,
				yaml: "{ id: single, items: nested }",
			},
		],
		[
			"anonymous item with items returns item with hyperlinks, and without breadcrumbs and parent",
			{
				expectedHtmlPrefix: "",
				expectedSvgFile: "anonymous without parent and with hyperlinks",
				locationHash: null,
				yaml: "{ items: nested }",
			},
		],
		[
			"parent with identifier with child without items and location hash of parent identifier returns breadcrumb of root and child without hyperlink",
			{
				expectedHtmlPrefix: breadcrumbHtmlForRoot,
				expectedSvgFile: "with parent and without hyperlinks",
				locationHash: "#subset-item=parent",
				yaml: "{ id: parent, items: single }",
			},
		],
		[
			"anonymous grandparent without identifier, parent with child without items and location hash of undefined and parent returns breadcrumb of root and anonymous, and child without hyperlink",
			{
				expectedHtmlPrefix: "<div><a href=\"#\">root</a><span class=\"ancestor-separator\">–</span><a href=\"#subset-item=undefined\" style=\"font-style:italic\">anonymous</a></div>",
				expectedSvgFile: "with parent and without hyperlinks",
				locationHash: "#subset-item=undefined/parent",
				yaml: "{ items: { id: parent, items: single } }",
			},
		],
		[
			"parent with identifier with child with items and location hash of parent identifier returns breadcrumb of root and child with hyperlink prefixed with parent identifier",
			{
				expectedHtmlPrefix: breadcrumbHtmlForRoot,
				expectedSvgFile: "with parent and hyperlinks",
				locationHash: "#subset-item=parent",
				yaml: "{ id: parent, items: { id: single, items: nested } }",
			},
		],
		[
			"grandparent and parent with identifiers, child with items and location hash of grandparent and parent identifier returns breadcrumb of root and grandparent, and child with hyperlink prefixed with parent identifier",
			{
				expectedHtmlPrefix: "<div><a href=\"#\">root</a><span class=\"ancestor-separator\">–</span><a href=\"#subset-item=grandparent\">grandparent</a></div>",
				expectedSvgFile: "with grandparent and parent and hyperlinks",
				locationHash: "#subset-item=grandparent/parent",
				yaml: "{ id: grandparent, items: { id: parent, items: { id: single, items: nested } } }",
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
			expectedFilePath:
				path.join(__dirname, `${expectedSvgFile}.svg`),
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
				createElementsFromStack({
					createElement,
					locationHash:
						createHashFromLocation({ hash: "no hash prefix" }),
					resizableElementTypes:
						null,
					stack:
						null,
				}),
		)
		.toThrowError(
			"Location hash must start with a hash character.",
		),
);

test(
	"subset of item without child items throws error",
	() =>
		expect(
			() =>
				createElementsFromStack({
					createElement,
					locationHash:
						createHashFromLocation({ hash: "#subset-item=grandparent/parent" }),
					resizableElementTypes:
						null,
					stack:
						[ [ {
							id: "grandparent",
							items: [ [ { id: "parent" } ] ],
						} ] ],
				}),
		)
		.toThrowError(
			"Final item of subset identifier hierarchy \"grandparent->parent\" has no child items.",
		),
);