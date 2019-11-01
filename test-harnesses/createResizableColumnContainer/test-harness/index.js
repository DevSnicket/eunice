/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	{ createElement } = require("react"),
	createHashFromLocation = require("../../createHashFromLocation"),
	createResizableColumnContainer = require(".."),
	renderIntoContainerElement = require("../../renderIntoContainerElement");

renderIntoContainerElement({
	initialState:
		null,
	renderStateful:
		() =>
			createResizableColumnContainer({
				columns:
					[
						{ element: createElement("div", null, "left") },
						{
							element: createElement("div", null, "middle"),
							flex: { default: 0.6 },
						},
						{
							element: createElement("div", null, "right"),
							flex: { key: "right-column-flex" },
						},
					],
				flexKeysAndValues:
					createHashFromLocation(location),
			}),
});