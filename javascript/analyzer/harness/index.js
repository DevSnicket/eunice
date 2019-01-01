const
	{ callOrCreateElementOnError, renderHarness } = require("@devsnicket/eunice-test-harnesses"),
	{ createElement } = require("react"),
	createJavascriptInputResizableColumn = require("./createJavascriptInputResizableColumn"),
	getYamlFromJavaScript = require("../getYamlFromJavaScript");

renderHarness({
	createColumns:
		({ columnFactory, stateful }) =>
			[
				createJavascriptInputResizableColumn({
					createResizableColumnForInput: columnFactory.createResizableColumnForInput,
					state: stateful.state,
				}),
				columnFactory.createResizableColumn({
					element:
						callOrCreateElementOnError({
							action:
								() =>
									createElement(
										"pre",
										{
											style:
												{
													flex: 1,
													overflow: "scroll",
												},
										},
										createElement(
											"code",
											{ id: "yaml" },
											getYamlFromJavaScript(stateful.state.javascript),
										),
									),
							createElement,
						}),
					title: "YAML",
				}),
			],
	initialState:
		// javascriptFromWebpack is replaced with literal by harness/webpack.config.js
		// eslint-disable-next-line no-undef
		{ javascript: javascriptFromWebpack },
});