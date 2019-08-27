// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	{ callOrCreateElementOnError, createFillWithTitleElement } = require("@devsnicket/eunice-test-harnesses"),
	{ createElement } = require("react"),
	getYamlFromJavascript = require("../getYamlFromJavascript");

module.exports =
	javascript =>
		createFillWithTitleElement({
			content:
				callOrCreateElementOnError({
					action:
						() =>
							createElement(
								"pre",
								{
									style:
										{
											flex: 1,
											overflow: "auto",
										},
								},
								createElement(
									"code",
									{ id: "yaml" },
									getYamlFromJavascript({
										isReactJsxEnabled: true,
										javascript,
									}),
								),
							),
					createElement,
				}),
			title:
				"YAML",
		});