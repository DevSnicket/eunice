// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import {
	addDirectionAndMutualStackToDependenciesInStack,
	createStackFromYaml,
} from "@devsnicket/eunice-dependency-and-structure";

import { createElement } from "react";
import createWithDependencyList from "..";
import path from "path";
import readTextFile from "../../../../../readTextFile";
import removeWhitespaceFromTestExpected from "../removeWhitespaceFromTestExpected";
import { renderToStaticMarkup } from "react-dom/server";

const
	dependsUponIdentifier = "depends upon",
	element = "element";

test(
	"item not in subset with no dependencies returns only element",
	() => {
		const itemIdentifier = "item";

		expect(
			renderToStaticMarkup(
				createWithDependencyList({
					closeHref:
						null,
					createAncestorSeparatorElement:
						null,
					createElement,
					element,
					getHrefWithIdentifierHierarchy:
						null,
					identifier:
						itemIdentifier,
					level:
						{},
					locationHash:
						{},
					relationship:
						"dependsUpon",
					resizableElementTypes:
						null,
					stack:
						[ [ { id: itemIdentifier } ] ],
				}),
			),
		)
		.toBe(element);
	},
);

test(
	"subset of child item that depends upon item in same level returns element and dependency list in Reflex resize",
	async() => {
		const
			childIdentifier = "item",
			parentIdentifier = "parent";

		const stack =
			createStackFromYaml(
				[
					{
						id:
							parentIdentifier,
						items:
							[
								{
									dependsUpon: dependsUponIdentifier,
									id: childIdentifier,
								},
							],
					},
					{ id: dependsUponIdentifier },
				],
			);

		addDirectionAndMutualStackToDependenciesInStack(stack);

		expect(
			renderToStaticMarkup(
				createWithDependencyList({
					closeHref:
						"close-href",
					createAncestorSeparatorElement:
						null,
					createElement,
					element,
					getHrefWithIdentifierHierarchy:
						null,
					identifier:
						childIdentifier,
					level:
						"same",
					locationHash:
						{ getValueOfKey: () => null },
					relationship:
						"dependsUpon",
					resizableElementTypes:
						{
							/* cSpell:disable */
							container: "resizablecontainer",
							item: "resizableitem",
							splitter: "resizablesplitter",
							/* cSpell:enable */
						},
					stack:
						stack[0][0].items,
				}),
			),
		)
		.toBe(
			removeWhitespaceFromTestExpected(
				await readTextFile(
					path.join(__dirname, "test-case.html"),
				),
			),
		);
	},
);