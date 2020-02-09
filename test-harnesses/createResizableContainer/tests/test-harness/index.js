/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";

import { createElement } from "react";
import createHashFromLocation from "../../../createHashFromLocation";
import createResizableContainer from "../..";
import renderIntoContainerElement from "../../../renderIntoContainerElement";

renderIntoContainerElement({
	initialState:
		null,
	renderStateful:
		() => {
			const
				flexKeysAndValues =
					createHashFromLocation(location),
				resizableElementTypes =
					{
						container: ReflexContainer,
						item: ReflexElement,
						splitter: ReflexSplitter,
					};

			return (
				createResizableContainer({
					createElement,
					flexKeysAndValues,
					items:
						[
							{ element: createElement("div", null, "left") },
							{
								element: createElement("div", null, "middle"),
								flex: { default: 0.6 },
							},
							{
								element:
									createResizableContainer({
										createElement,
										flexKeysAndValues,
										items:
											[
												{
													element: createElement("div", null, "right upper"),
													flex: { key: "right-upper-height" },
												},
												{ element: createElement("div", null, "right lower") },
											],
										orientation:
											"horizontal",
										resizableElementTypes,
									}),
								flex:
									{ key: "right-width" },
							},
						],
					orientation:
						"vertical",
					resizableElementTypes,
				})
			);
		},
});