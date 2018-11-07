const
	{ createElement } = require("react"),
	{ ReflexElement } = require("react-reflex");

const
	createColumnFactory = require("../../Harnesses/createColumnFactory"),
	createContainerForColumns = require("../../Harnesses/createContainerForColumns"),
	createJavascriptInputResizableColumn = require("./createJavascriptInputResizableColumn"),
	getYamlFromJavaScript = require("../getYamlFromJavaScript"),
	renderComponent = require("../../Harnesses/renderComponent");

renderComponent({
	render() {
		const columnFactory =
			createColumnFactory({
				createElement,
				resizableColumn: ReflexElement,
				stateful: this,
			});

		return (
			createContainerForColumns(
				createJavascriptInputResizableColumn({
					createResizableColumnForInput: columnFactory.createResizableColumnForInput,
					state: this.state,
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
								getYamlFromJavaScript(this.state.javascript),
							),
						),
					title: "YAML",
				}),
			)
		);
	},
	state:
		// javascriptFromWebpack is replaced with literal by harness/webpack.config.js
		// eslint-disable-next-line no-undef
		{ javascript: javascriptFromWebpack },
});