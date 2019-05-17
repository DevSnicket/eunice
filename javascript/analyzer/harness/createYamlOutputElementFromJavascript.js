const
	{ callOrCreateElementOnError, createFillWithTitleElement } = require("@devsnicket/eunice-test-harnesses"),
	{ createElement } = require("react"),
	getYamlFromJavaScript = require("../getYamlFromJavaScript");

module.exports =
	yaml =>
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
									getYamlFromJavaScript(yaml),
								),
							),
					createElement,
				}),
			title:
				"YAML",
		});