const
	{ createElement } = require("react"),
	createJavascriptInputResizableColumn = require("./createJavascriptInputResizableColumn"),
	getYamlFromJavaScript = require("../getYamlFromJavaScript"),
	renderHarness = require("@devsnicket/eunice-test-harnesses/renderHarness");

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
					title: "YAML",
				}),
			],
	initialState:
		// javascriptFromWebpack is replaced with literal by harness/webpack.config.js
		// eslint-disable-next-line no-undef
		{ javascript: javascriptFromWebpack },
});